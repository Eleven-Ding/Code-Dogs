/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "blog-1303885568.cos.ap-chengdu.myqcloud.com",
      "avatars.githubusercontent.com",
      "thirdqq.qlogo.cn",
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
