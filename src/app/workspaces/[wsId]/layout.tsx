"use client";

import DesktopWorkspaceSidebar from "@/components/ui/workspace/desktop-workspace-sidebar";
import useMediaQuery from "@/utility/useMediaQuery-hook";
import React, { ReactNode } from "react";

const WorkspaceLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-screen h-full border flex justify-between items-center bg-white">
      {!isMobile && (
        <div className="md:w-[25%] lg:w-[20%] flex h-full">
          <DesktopWorkspaceSidebar />
        </div>
      )}

      <div className="w-[100%] md:w-[70%] lg:w-[80%] h-full">{children}</div>
    </div>
  );
};

export default WorkspaceLayout;
