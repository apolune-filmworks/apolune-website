/** Resolve public assets and internal links under the configured deployment path. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (!path.startsWith("/") || path.startsWith("//") || !base || path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}

/** Include URLs embedded in content, including image arrays passed to browser scripts. */
export function resolveContentUrls<T>(value: T): T {
  if (typeof value === "string") return withBase(value) as T;
  if (Array.isArray(value)) return value.map(resolveContentUrls) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveContentUrls(item)])) as T;
  }
  return value;
}
