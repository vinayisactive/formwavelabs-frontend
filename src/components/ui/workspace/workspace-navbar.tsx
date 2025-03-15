"use client";

import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Users, UserPlus, PanelRight, Plus } from "lucide-react";
import WorkspaceMembers from "./workspace-members";

interface WorkspaceNavbarProps {
  workspaceName: string | undefined;
  userRole: string | null;
  membersCount: number | undefined;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  setInviteModalOpen: Dispatch<SetStateAction<boolean>>;
  setCreateFormModal: Dispatch<SetStateAction<boolean>>;
  wsId: string;
}

const WorkspaceNavbar: FC<WorkspaceNavbarProps> = ({
  workspaceName,
  userRole,
  setIsSidebarOpen,
  setInviteModalOpen,
  setCreateFormModal,
  wsId,
}) => {
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className=" hover:bg-gray-100 rounded-lg md:hidden"
        >
          <PanelRight className="h-5 w-5" />
        </button>

        <p className=" whitespace-nowrap">{workspaceName}</p>
      </div>

      <div className="flex justify-end items-center gap-1 ">
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <button
            className="border px-3 py-1 rounded-md shadow-sm text-black text-sm hover:bg-black hover:text-white flex items-center gap-1 whitespace-nowrap"
            onClick={() => setCreateFormModal((prev) => !prev)}
          >
            Create form <Plus size={15} />
          </button>
        )}

{        userRole && <div className="relative">
          <button
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMembersModalOpen((prev) => !prev)}
          >
            <Users className="text-black" size={15} />
            <span className="hidden md:inline text-black text-sm font-medium">
              Members
            </span>
          </button>

          {isMembersModalOpen && (
            <div
              className="absolute top-0 right-0 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <WorkspaceMembers userRole={userRole} wsId={wsId} setIsMembersModalOpen={setIsMembersModalOpen} />
            </div>
          )}
        </div>}

        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <button
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-200 text-sm"
            onClick={() => setInviteModalOpen((prev) => !prev)}
          >
            <UserPlus size={15} />
            <span className="hidden md:flex">Invite</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkspaceNavbar;
