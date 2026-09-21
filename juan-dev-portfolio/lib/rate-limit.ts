/**
 * Sliding-window limiter kept in memory. On serverless hosts each instance has
 * its own counter, so this is a best-effort brake against a single client
 * hammering the endpoint, not a hard global quota.
 */
const hits = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
