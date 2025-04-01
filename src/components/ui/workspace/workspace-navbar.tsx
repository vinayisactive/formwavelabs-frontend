"use client";

import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Users, UserPlus, PanelRight, Plus, Edit, Loader2, X } from "lucide-react";
import WorkspaceMembers from "./workspace-members";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { handleAxiosError } from "@/utility/axios-err-handler";

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
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [workspaceNameInput, setWorkspaceNameInput] = useState<
    string | undefined
  >(workspaceName || "");
  const session = useSession().data;
  const queryClient = useQueryClient();

  const updateWorkspaceNameMutation = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}`,
        {
          name: workspaceNameInput,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      setIsEditModeOn(false);
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error) => console.error(handleAxiosError(error)),
  });

  return (
    <div className="min-h-[50px] flex justify-between items-center w-full">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className=" hover:bg-gray-100 rounded-lg md:hidden"
        >
          <PanelRight className="h-5 w-5" />
        </button>

        <div>
          {isEditModeOn ? (
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                className=" rounded-md outline"
                value={workspaceNameInput}
                onChange={(e) => setWorkspaceNameInput(e.target.value)}
              />
              <button
                className="p-1 rounded-md bg-black text-white flex justify-center items-center gap-2"
                onClick={() => updateWorkspaceNameMutation.mutate()}
              >
                save
                {updateWorkspaceNameMutation.isPending && (
                  <Loader2 size={15} className="animate-spin" />
                )}
              </button>

              <button className="bg-black rounded-md p-1 text-white" onClick={() => setIsEditModeOn(false)}>
                <X size={15}/>
              </button>
            </div>
          ) : (
            <div className="flex gap-2 justify-center items-center">
              <p className=" whitespace-nowrap">{workspaceName}</p>
              { userRole === "OWNER" &&<button onClick={() => setIsEditModeOn(true)}>
                <Edit size={15} />
              </button>}
            </div>
          )}
        </div>
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

        {userRole && (
          <div className="relative">
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
                <WorkspaceMembers
                  userRole={userRole}
                  wsId={wsId}
                  setIsMembersModalOpen={setIsMembersModalOpen}
                />
              </div>
            )}
          </div>
        )}

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
