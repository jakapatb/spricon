import { transform as svgrTransform, Config as SvgrConfig } from '@svgr/core';
import { TransformOptions } from './types';

export const transform: TransformOptions = {
  react: async (svg, componentName) => {
    const template: SvgrConfig['template'] = (variables, { tpl }) => {
      if (variables.props.length > 0 && 'properties' in variables.props[0]) {
        variables.props[0].properties.unshift({
          type: 'ObjectProperty',
          key: { type: 'Identifier', name: 'id' },
          value: { type: 'Identifier', name: 'id' },
          computed: false,
          shorthand: true,
          decorators: null,
        });
      }

      return tpl`
        ${variables.imports};
        ${variables.interfaces};
        
        const ${variables.componentName} = function ${variables.componentName}(${variables.props}) {
          return ${variables.jsx};
        };
        
        ${variables.exports};
      `;
    };

    const svgrConfig: SvgrConfig = {
      ref: true,
      memo: true,
      titleProp: true,
      template,
      jsxRuntime: 'automatic',
      typescript: true,
      jsx: {},
      plugins: ['@svgr/plugin-jsx'],
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    };

    let component = await svgrTransform(svg, svgrConfig, { componentName });

    return component;
  },
};
