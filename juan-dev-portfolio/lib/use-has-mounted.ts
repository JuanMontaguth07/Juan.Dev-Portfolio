import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** True only after the client has hydrated; avoids the useEffect+setState mount-flag pattern. */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
