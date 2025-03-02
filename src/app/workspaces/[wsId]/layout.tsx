import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import WorkspaceSidebar from "@/components/ui/workspace/workspace-sidebar";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

const WorkspaceLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const data = await fetch(
    "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const workspaces = await data.json();

  return (
    <div className="w-screen h-full border flex justify-center items-center bg-white">
      <div className="hidden w-[20%] md:flex border h-full">
        <WorkspaceSidebar workspaces={workspaces.data} />
      </div>

      <div className="w-[100%] md:w-[80%] h-full">{children}</div>
    </div>
  );
};

export default WorkspaceLayout;
