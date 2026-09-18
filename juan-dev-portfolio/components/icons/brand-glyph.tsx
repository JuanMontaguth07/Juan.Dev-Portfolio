import type { SVGProps } from "react";

/** Renders a single-path brand mark (24x24 viewBox, fills with currentColor). */
export function BrandGlyph({
  path,
  ...props
}: { path: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={path} />
    </svg>
  );
}
