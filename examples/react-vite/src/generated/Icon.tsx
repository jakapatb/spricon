import { SVGProps, memo } from 'react';

export type IconName = 'Home' | 'Settings';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
}

function Icon({ name, ...props }: IconProps) {
  return <svg color="currentColor" width="1em" height="1em" {...props}>
  <use href={`/icons/sprite-icons-d947de9f.svg#${name}`} />
  </svg>
}

export default memo(Icon);