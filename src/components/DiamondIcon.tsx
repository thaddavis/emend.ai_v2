import type { ComponentPropsWithoutRef } from "react";

interface SvgProps extends ComponentPropsWithoutRef<"svg"> {
  className: string;
}

export function DiamondIcon(props: SvgProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 6 6" {...props}>
      <path d="M3 0L6 3L3 6L0 3Z" strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}
