"use client";
import ReactQueryProvider from "@/utility/react-query-provider";
import { SessionProvider } from "next-auth/react";
import React from "react";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
};

export default LayoutProvider;
