import type { Config as SvgoConfig } from 'svgo';

export interface IconData {
  svg: string;
  componentName: string;
}

export type Output = {
  spritePath: string | string[];
  distPath: string;
  spriteHref?: string;
  spriteName?: string;
  hashSuffix?: boolean;
};

export type Config = {
  input: string;
  output: Output;
  svgoConfig?: SvgoConfig;
};

export interface TransformOptions {
  react: (svg: string, componentName: string) => Promise<string>;
}
