"use client";

import { handleAxiosError } from "@/utility/axios-err-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useState } from "react";

const CreateWorkspaceModal = ({
  setCreateWorkspaceModal,
}: {
  setCreateWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [workspaceName, setWorkspaceName] = useState<string>("");

  const addWorkspaceMutation = useMutation({
    mutationFn: () =>
      axios.post(
        "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces",
        { name: workspaceName.trim() },
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      ),
    onSuccess: () => {
      setWorkspaceName("");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      setCreateWorkspaceModal(false);
    },
    onError: (err) => console.error(handleAxiosError(err)),
  });

  const onClose = () => setCreateWorkspaceModal(false);

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] max-w-xl bg-white rounded-xl border border-gray-200 shadow-sm shadow-black/30 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-xl text-black font-bold">Create Workspace</p>
            <p className="text-xs text-gray-400">
              and invite your team mates.
            </p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Enter workspace name"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        />

        <div className="flex w-full justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => addWorkspaceMutation.mutate()}
            disabled={!workspaceName.trim() || addWorkspaceMutation.isPending}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-black text-white flex items-center justify-center gap-2 hover:bg-black/85 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
           {
            addWorkspaceMutation.isPending ? "Creating..." : "Create"
           }

            {addWorkspaceMutation.isPending && (
              <Loader2 size={16} className="animate-spin" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;
