/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://localhost:3001/:api*",
      },
    ];
  },
};

module.exports = nextConfig;
