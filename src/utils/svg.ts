export const getSvgIconContent = (
  id: string,
  spriteFileName: string,
): string => `<svg fill="none" stroke="currentColor" stroke-width="0" aria-hidden="true" color="currentColor" width="1em" height="1em">
<use href="/sprite-icons/${spriteFileName}.svg#${id}" />
</svg>`;
