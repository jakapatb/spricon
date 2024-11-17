import { forwardRef, memo } from "react";
const SettingsIcon = function SettingsIcon({
  id="",
  title,
  titleId,
  ...props
}, ref) {
  return <svg fill="none" stroke="currentColor" strokeWidth={0} aria-hidden="true" color="currentColor" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<use href="/sprite-icons/sprite-icons-3bd49c9c.svg#SettingsIcon" /></svg>;
};
const ForwardRef = forwardRef(SettingsIcon);
const Memo = memo(ForwardRef);
export default Memo;