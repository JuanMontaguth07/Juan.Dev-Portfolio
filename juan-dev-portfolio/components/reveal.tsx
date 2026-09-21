import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fade-up on scroll, done entirely in CSS (see `.reveal` in globals.css) so
 * the ~30 instances on the page cost no JavaScript to hydrate. `delay` (in
 * seconds, as before) staggers where in the entry range the fade starts.
 * Browsers without scroll-driven animations simply show the content.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children?: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("reveal", className)}
      style={
        delay
          ? ({ "--reveal-offset": `${Math.round(delay * 100)}%` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
