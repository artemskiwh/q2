// Helper for prefixing site-relative paths with Next's basePath ("/q2" in prod).
// Plain <img src="…"> and CSS background-image URLs don't get the basePath
// auto-applied, so anything starting with "/" needs this helper before render.

const BASE_PATH = process.env.NODE_ENV === "production" ? "/q2" : "";

export function withBasePath(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/")) return `${BASE_PATH}${path}`;
  return path;
}
