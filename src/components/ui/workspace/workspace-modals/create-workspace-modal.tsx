"use client";

import { handleAxiosError } from "@/utility/axios-err-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useState } from "react";

const CreateWorkspaceModal = ({setCreateWorkspaceModal}: {setCreateWorkspaceModal: Dispatch<SetStateAction<boolean>>}) => {
  const session = useSession().data;
  const queryClient = useQueryClient();
  const [workspaceName, setWorkspaceName] = useState<string | null>(null);

  const addWorkspaceMutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces",
        {
          name: workspaceName?.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    },

    onSuccess: () => {
      setWorkspaceName(null);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      setCreateWorkspaceModal(false); 
    },
    onError: (err) => console.error(handleAxiosError(err)),
  });

  return (
    <div className=" absolute inset-0 bg-white/50 backdrop-blur-sm z-[100] flex justify-center items-center ">
      <div className="w-[80%] md:w-[40%] lg:w-[20%] p-4 rounded-xl bg-white shadow-sm border space-y-6 shadow-black/30">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl text-black font-bold">Create Workspace</p>
            <p className="text-sm text-gray-400">and invite your team mates.</p>
          </div>

          <button className=" cursor-pointer" onClick={() => setCreateWorkspaceModal(false)}>
            <X size={15} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter workspace name"
            value={workspaceName || ""}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
          />

          <button
            onClick={() => addWorkspaceMutation.mutate()}
            disabled={!workspaceName?.trim() || addWorkspaceMutation.isPending}
            className=" w-full 7px-4 py-2 bg-black text-white font-medium flex gap-2 justify-center items-center rounded-lg disabled:cursor-not-allowed hover:bg-gray-900 transition-all"
          >
            Create workspace
            {addWorkspaceMutation.isPending && (
              <Loader2 size={15} className="animate-spin" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;
