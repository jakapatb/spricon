import type { Config } from 'spricon';

export default {
  input: './icons',
  output: {
    spritePath: ['./public', './'],
    distPath: './src/generated',
    hashSuffix: true,
  },
} satisfies Config;
