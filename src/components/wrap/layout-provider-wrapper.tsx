"use client"
import ReactQueryProvider from "@/utility/react-query-provider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

const LayoutProvider = ({
  children,
  session,
}: {
  session: Session | null;
  children: React.ReactNode;
}) => {
  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
};

export default LayoutProvider;
