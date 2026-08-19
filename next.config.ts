import type { NextConfig } from "next";

// Set by the GitHub Actions workflow (see .github/workflows/deploy.yml) so
// the static export's asset/link paths match the project-pages URL
// https://<user>.github.io/mediacourse-app/. Left empty for local dev.
const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
