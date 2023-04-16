/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
