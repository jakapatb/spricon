import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const HomeIcon = function HomeIcon(
  { id, title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
  ref: Ref<SVGSVGElement>,
) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      color="currentColor"
      width="1em"
      height="1em"
      ref={ref}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <use href="/icons/sprite-icons-3bd49c9c.svg#HomeIcon" />
    </svg>
  );
};
const ForwardRef = forwardRef(HomeIcon);
const Memo = memo(ForwardRef);
export default Memo;
