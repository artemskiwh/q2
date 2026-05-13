/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "q2";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
