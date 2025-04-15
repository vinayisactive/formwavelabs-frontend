"use client";

import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Users, UserPlus, PanelRight, Plus, Edit, Loader2, X, Database } from "lucide-react";

import WorkspaceMembers from "./workspace-members";
import WorkSpaceInviteModal from "./workspace-modals/workspace-invite-modal";
import WorkspaceCreateFormModal from "./workspace-modals/workspace-create-form-modal";
import WorkspaceAssetModal from "./workspace-modals/workspace-asset-modal";
import WorkspaceSidebarMobile from "./workspace-sidebar-mobile";
import useMediaQuery from "@/utility/useMediaQuery-hook";
import { handleAxiosError } from "@/utility/axios-err-handler";

interface WorkspaceNavbarProps {
  workspaceName: string | undefined;
  userRole: string | null;
  membersCount: number | undefined;
  wsId: string;
  setCreateWorkspaceModal: Dispatch<SetStateAction<boolean>>; 
}

const WorkspaceNavbar: FC<WorkspaceNavbarProps> = ({ workspaceName, userRole, wsId, setCreateWorkspaceModal }) => {
  const session = useSession().data;
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [workspaceNameInput, setWorkspaceNameInput] = useState(workspaceName || "");
  const [isCreateFormModal, setCreateFormModal] = useState(false);
  const [isMembersModalOpen, setMembersModal] = useState(false);
  const [isAssetModalOpen, setAssetModal] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebar] = useState(false);
  const [isInviteModalOpen, setInviteModal] = useState(false);

  const updateWorkspaceNameMutation = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}`,
        { name: workspaceNameInput },
        { headers: { Authorization: `Bearer ${session?.accessToken}` }})
    },
    onSuccess: () => {
      setIsEditModeOn(false);
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error) => console.error(handleAxiosError(error)),
  });

  return (
    <div className="py-2 md:py-0 min-h-[60px] flex flex-col md:flex-row md:justify-between md:items-center justify-start items-start w-full gap-2">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setMobileSidebar(true)}
          className="hover:bg-gray-100 rounded-lg md:hidden"
        >
          <PanelRight className="h-5 w-5" />
        </button>

        <div>
          {isEditModeOn ? (
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                className="outline-none border rounded-md p-1"
                value={workspaceNameInput}
                placeholder={workspaceNameInput}
                onChange={(e) => setWorkspaceNameInput(e.target.value)}
              />
              <button
                className="p-1 rounded-md bg-black text-white flex justify-center items-center gap-2 text-[12px] px-2"
                onClick={() => updateWorkspaceNameMutation.mutate()}
              >
                save
                {updateWorkspaceNameMutation.isPending && (
                  <Loader2 size={15} className="animate-spin" />
                )}
              </button>
              <button
                className="bg-black rounded-md p-1 text-white"
                onClick={() => setIsEditModeOn(false)}
              >
                <X size={17} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2 justify-center items-center">
              <p className="whitespace-nowrap text-xl md:text-3xl pb-0.5 md:pb-2 font-bold">
                {workspaceName}
              </p>
              {userRole === "OWNER" && (
                <button onClick={() => setIsEditModeOn(true)}>
                  <Edit size={15} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center gap-1 w-full md:w-auto">
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <button
            className="border px-4 py-2 rounded-3xl shadow-sm font-bold bg-white text-black text-sm hover:bg-black hover:text-white flex items-center gap-1 whitespace-nowrap"
            onClick={() => setCreateFormModal((prev) => !prev)}
          >
            Create form <Plus size={15} />
          </button>
        )}

        <div className="flex gap-1">
          {userRole && (
            <div className="relative">
              <button
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMembersModal((prev) => !prev)}
              >
                <Users className="text-black" size={15} />
              </button>

              {isMembersModalOpen && (
                <div className="absolute top-0 right-0 z-50" onClick={(e) => e.stopPropagation()}>
                  <WorkspaceMembers
                    userRole={userRole}
                    wsId={wsId}
                    setMembersModal={setMembersModal}
                  />
                </div>
              )}
            </div>
          )}

          {(userRole === "ADMIN" || userRole === "OWNER") && (
            <button
              className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-200 text-sm"
              onClick={() => setInviteModal((prev) => !prev)}
            >
              <UserPlus size={15} />
            </button>
          )}

          {userRole && (
            <button
              className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-200 text-sm"
              onClick={() => setAssetModal((prev) => !prev)}
            >
              <Database size={14} />
            </button>
          )}

          {isMobile && (
            <WorkspaceSidebarMobile
              setMobileSidebar={setMobileSidebar}
              isMobileSidebarOpen={isMobileSidebarOpen}
              setCreateWorkspaceModal={setCreateWorkspaceModal}
              wsId={wsId}
            />
          )}

          {isAssetModalOpen && (
            <WorkspaceAssetModal
              workspaceName={workspaceName}
              wsId={wsId}
              setAssetModal={setAssetModal}
            />
          )}

          {isInviteModalOpen && (
            <WorkSpaceInviteModal
              wsId={wsId}
              workspaceName={workspaceName}
              isInviteModalOpen={isInviteModalOpen}
              setInviteModal={setInviteModal}
            />
          )}

          {isCreateFormModal && (
            <WorkspaceCreateFormModal
              wsId={wsId}
              workspaceName={workspaceName}
              isCreateFormModal={isCreateFormModal}
              setCreateFormModal={setCreateFormModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceNavbar;