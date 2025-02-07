"use client";

import React from "react";
import { ImageKitProvider } from "imagekitio-next";

const urlEndpoint = process.env.IMAGEKIT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

export default function ImgKitProvider({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
      }

      const { signature, expire, token } = await response.json();
      return { signature, expire, token };
    } catch (error) {
      console.error("ImageKit authentication error:", error);
      throw new Error("Failed to authenticate with ImageKit.");
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
      {children}
    </ImageKitProvider>
  );
}
