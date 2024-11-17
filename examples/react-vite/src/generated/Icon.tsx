import { SVGProps, memo } from 'react';

export type IconName = 'Home' | 'Settings';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
}

function Icon({ name, ...props }: IconProps) {
  return <svg fill="none" stroke="currentColor" strokeWidth={0} aria-hidden="true" color="currentColor" width="1em" height="1em" {...props}><use href={`/sprite-icons-3bd49c9c.svg#${name}`} /></svg>
}

export default memo(Icon);