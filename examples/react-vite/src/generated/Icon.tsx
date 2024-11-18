import { SVGProps, memo } from 'react';

export type IconName = 'Alt' | 'AltFive' | 'AltFour' | 'AltOne' | 'AltThree' | 'AltTwo' | 'Boost' | 'Chat' | 'Home' | 'Settings';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
}

function Icon({ name, ...props }: IconProps) {
  return <svg color="currentColor" width="1em" height="1em" {...props}>
  <use href={`/icons/sprite-icons-f1d9c764.svg#${name}`} />
  </svg>
}

export default memo(Icon);