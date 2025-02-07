"use client";

import React from "react";
import { ImageKitProvider } from "imagekitio-next";

const urlEndpoint = process.env.IMAGEKIT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

export default function ImgKitProvider({children}: {children: React.ReactNode}) {

  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: unknown) {
      console.log(error);
      throw new Error(`Authentication request failed`);
    }
  };

  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      {children}
    </ImageKitProvider>
  );
}
