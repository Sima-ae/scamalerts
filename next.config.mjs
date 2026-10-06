/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactCompiler: true,
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
