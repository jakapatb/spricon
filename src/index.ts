import * as fs from 'fs/promises';
import camelcase from 'camelcase';
import { resolve } from 'path';
import { optimize, Config as SvgoConfig } from 'svgo';
import crypto from 'crypto';
import { transform } from './transform';
import { Config } from './types';
import { ensureWrite } from './utils/file';

const defaultSvgoConfig: SvgoConfig = {
  plugins: ['removeDimensions', 'sortAttrs'],
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
};

const getSvgIconContent = (
  id: string,
  spriteFileName: string,
): string => `<svg fill="none" stroke="currentColor" stroke-width="0" aria-hidden="true" color="currentColor" width="1em" height="1em">
<use href="/sprite-icons/${spriteFileName}.svg#${id}" />
</svg>`;

const getIcons = async (
  input: string,
  suffix = 'Icon',
  spriteFileName?: string,
): Promise<IconData[]> => {
  const files = (await fs.readdir(input)).filter((file) => file.endsWith('.svg'));

  return Promise.all(
    files.map(async (file) => {
      const componentName = `${camelcase(file.replace(/\.svg$/, ''), {
        pascalCase: true,
      })}${suffix}`;

      const svg =
        suffix === 'Icon' && spriteFileName
          ? getSvgIconContent(componentName, spriteFileName)
          : await fs.readFile(resolve(input, file), 'utf8');

      return { svg, componentName };
    }),
  );
};

interface IconData {
  svg: string;
  componentName: string;
}

const buildIcons = async (
  config: Config,
  suffix: string,
  spriteFileName?: string,
): Promise<IconData[]> => {
  const icons = await getIcons(config.input, suffix, spriteFileName);

  // // Generate types
  // const types = `import * as React from 'react';\ndeclare function Icon(props: React.ComponentProps<'svg'> & { name: ${icons
  //   .map(({ componentName }) => `"${componentName}"`)
  //   .join(' | ')} }): React.ReactElement;\nexport default Icon;\n`;
  // await ensureWrite(`${config.output.distPath}/Icon.d.ts`, types);

  // Generate icons
  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => {
      const content = await transform.react(svg, componentName).catch((error) => {
        console.log(`Error building ${componentName}`);
        throw error;
      });

      const types = `import * as React from 'react';\ndeclare function ${componentName}(props: React.ComponentProps<'svg'> & { title?: string, titleId?: string, id?:string }): React.ReactElement;\nexport default ${componentName};\n`;

      return [
        ensureWrite(`${config.output.distPath}/${componentName}.js`, content),
        ...(types ? [ensureWrite(`${config.output.distPath}/${componentName}.d.ts`, types)] : []),
      ];
    }),
  );

  return icons;
};

const buildSpriteSVG = async (
  config: Config,
  suffix: string,
  svgoConfig: SvgoConfig = defaultSvgoConfig,
): Promise<string> => {
  const { input, output } = config;
  // Read and filter SVG files
  const files = await fs.readdir(input);
  const svgFiles = files.filter((file) => file.endsWith('.svg')).sort();

  // Transform SVGs into symbols
  const symbols = await Promise.all(
    svgFiles.map(async (file) => {
      const content = await fs.readFile(resolve(input, file), 'utf-8');
      const symbolId = camelcase(file.replace('.svg', suffix), {
        pascalCase: true,
      });
      const viewBox = content.match(/viewBox="([^"]+)"/)?.[0] ?? '';

      // Convert SVG to symbol
      return content
        .replace(/<svg[^>]+>/, `<symbol id="${symbolId}" ${viewBox}>`)
        .replace(/svg>/, 'symbol>')
        .replace(/xmlns="[^"]+"/, '');
    }),
  );

  const sprite = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`,
    `<defs>`,
    ...symbols,
    `</defs>`,
    `</svg>`,
  ].join('\n');

  // Optimize and save sprite
  const optimized = optimize(sprite, svgoConfig);

  // Generate unique filename
  const hash = crypto.createHash('md5').update(sprite).digest('hex').slice(0, 8);
  const filename = `sprite-icons-${hash}`;

  if (Array.isArray(output.spritePath)) {
    await Promise.all(
      output.spritePath.map((dir) => ensureWrite(`${dir}/${filename}.svg`, optimized.data)),
    );
  } else {
    await ensureWrite(`${output.spritePath}/${filename}.svg`, optimized.data);
  }
  return filename;
};

const readConfig = async (): Promise<Config> => {
  try {
    const configPath = resolve(process.cwd(), 'sprite-icon-bundler.config.ts');
    const { default: config } = await import(configPath);
    return {
      ...config,
      input: resolve(process.cwd(), config.input),
      output: {
        ...config.output,
        spritePath: resolve(process.cwd(), config.output.spritePath),
      },
    };
  } catch (error) {
    throw new Error('Could not load sprite-icon-bundler.config.ts configuration file');
  }
};

const exportAll = (icons: IconData[], includeExtension = true): string => {
  return icons
    .map(({ componentName }) => {
      const extension = includeExtension ? '.js' : '';
      return `export { default as ${componentName} } from './${componentName}${extension}'`;
    })
    .join('\n');
};

const buildIndex = async (icons: IconData[], outputPath: string) => {
  await ensureWrite(`${outputPath}/index.d.ts`, exportAll(icons, false));
  await ensureWrite(`${outputPath}/index.js`, exportAll(icons));
};

export async function buildSpriteIcons() {
  const config = await readConfig();
  const spriteFileName = await buildSpriteSVG(config, 'Icon', config.svgoConfig);
  const icons = await buildIcons(config, 'Icon', spriteFileName);
  await buildIndex(icons, config.output.distPath);
}
