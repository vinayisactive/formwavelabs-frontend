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
 }
};

export default nextConfig;
