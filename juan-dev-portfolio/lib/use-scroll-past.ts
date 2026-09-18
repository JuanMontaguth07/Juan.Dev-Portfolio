import { useEffect, useState } from "react";

/** True once the page has been scrolled past `threshold` pixels. */
export function useScrollPast(threshold: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    function onScroll() {
      setPast(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}
