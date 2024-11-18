import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const AltFourIcon = function AltFourIcon({
  id,
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) {
  return <svg fill="none" stroke="currentColor" strokeWidth={0} color="currentColor" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<use href="/icons/sprite-icons-f1d9c764.svg#AltFourIcon" /></svg>;
};
const ForwardRef = forwardRef(AltFourIcon);
const Memo = memo(ForwardRef);
export default Memo;