"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React, { useState } from "react";
import ImgKitProvider from "./imagekit-provider";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <ImgKitProvider>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ImgKitProvider>
    </SessionProvider>
  );
};

export default LayoutProvider;
