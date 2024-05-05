/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "http" && "https",
          hostname: "**",
        },
      ],
    },
  };


export default nextConfig;
