import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects(){
    return [
      {
        source: "/form/:formId",
        destination: "/form/:formId/builder",
        permanent: true
      }
    ]
  }, 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
