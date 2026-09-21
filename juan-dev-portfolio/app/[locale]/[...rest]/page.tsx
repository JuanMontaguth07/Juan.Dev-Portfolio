import { notFound } from "next/navigation";

// Any unknown path under a locale (e.g. /es/typo) lands here so it renders the
// localized not-found page inside the normal layout.
export default function CatchAll() {
  notFound();
}
