/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;

// 9591feaee07c9dbcafe3129d80047cd9d6a946ee93ac9e407a8925c4c2f0ade08f9d417aaee6678906927947479cd844d0a29149b8e1d1c457ebeeaac6751b617b5a9febf9cd51e6d926b37a36760cd1bfbbe534499eb2f47ae5218dd079946cdeb9827f5aef1f195ca10ec7cc138d53ed0b4030e85ac9a1ac05e41e8cf53a5b
