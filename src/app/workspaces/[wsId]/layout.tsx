import WorkspaceSidebar from "@/components/ui/workspace/workspace-sidebar";
import React, { ReactNode } from "react";

const WorkspaceLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-full border flex justify-center items-center bg-white">
      <div className="hidden w-[20%] md:flex border h-full">
        <WorkspaceSidebar/>
      </div>

      <div className="w-[100%] md:w-[80%] h-full">{children}</div>
    </div>
  );
};

export default WorkspaceLayout;
