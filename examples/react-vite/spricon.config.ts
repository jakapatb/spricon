import type { Config } from 'spricon';

export default {
  input: './icons',
  output: {
    spritePath: ['./public/icons'],
    distPath: './src/generated',
    hashSuffix: true,
    spriteHref: '/icons',
  },
} satisfies Config;
