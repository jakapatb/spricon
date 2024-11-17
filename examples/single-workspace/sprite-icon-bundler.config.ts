import type { Config } from 'sprite-icon-bundler';

export default {
  input: './icons',
  output: {
    spritePath: './public',
    distPath: './src/generated',
  },
} satisfies Config;
