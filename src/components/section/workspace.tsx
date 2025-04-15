"use client";

import useMediaQuery from "@/utility/useMediaQuery-hook";
import React, { useState } from "react";
import CurrentWorkspace from "../ui/workspace/current-workspace";
import Workspaces from "@/components/ui/workspace/workspaces";
import CreateWorkspaceModal from "../ui/workspace/workspace-modals/create-workspace-modal";

const Workspace = ({ wsId }: { wsId: string }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isCreateWorkspaceModalOpen, setCreateWorkspaceModal] = useState<boolean>(false);

  return (
    <div className=" absolute inset-0 border flex justify-between items-center bg-white">
      {!isMobile && (
        <div className="md:w-[30%] lg:w-[20%] flex h-full">
          <Workspaces setCreateWorkspaceModal={setCreateWorkspaceModal} wsId={wsId} />
        </div>
      )}

      <div className="w-[100%] md:w-[70%] lg:w-[80%] h-full relative">
        <CurrentWorkspace wsId={wsId} setCreateWorkspaceModal={setCreateWorkspaceModal}/>
      </div>

      {isCreateWorkspaceModalOpen && (
        <CreateWorkspaceModal setCreateWorkspaceModal={setCreateWorkspaceModal}/>
      )}
    </div>
  );
};

export default Workspace;
