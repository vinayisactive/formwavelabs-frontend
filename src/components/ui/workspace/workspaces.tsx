"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Users, Loader2, Box } from "lucide-react";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { handleAxiosError } from "@/utility/axios-err-handler";

interface Workspace {
  id: string;
  name: string;
}

interface WorkspacesData {
  status: string;
  message: string;
  data: {
    joinedWorkspaces: Workspace[];
    ownedWorkspaces: Workspace[];
  };
}

const Workspaces = () => {
  const { data: session } = useSession();
  const s = useSearchParams().get("s");
  const [newWorkspaceName, setNewWorkspaceName] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const [activeSection, setActiveSection] = useState<"owned" | "joined" | null>(
    s === "owned" || s === "joined" ? s : "owned"
  );

  const { data, isLoading, error } = useQuery<WorkspacesData>({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await fetch(
        "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces",
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch workspaces");
      return res.json();
    },
  });

  const addWorkspaceMutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces",
        {
          name: newWorkspaceName?.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    },

    onSuccess: () => {
      setNewWorkspaceName(null);
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
    onError: (err) => console.error(handleAxiosError(err)),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <Loader2 className="animate-spin " />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-2 p-2 w-full h-full flex flex-col">
      <div className="space-y-2 overflow-y-auto flex-grow">
        <div className="group">
          <button
            onClick={() => {
              setActiveSection((prev) => (prev === "owned" ? null : "owned"));
            }}
            className="w-full p-2 flex items-center justify-between rounded-lg transition-all
          hover:bg-gray-50 active:bg-gray-100"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <Box size={15} className="text-gray-600" />
              <span className="font-medium text-sm whitespace-nowrap">
                Your Workspaces
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md">
                {data?.data.ownedWorkspaces.length || 0}
              </span>
            </div>
            {activeSection === "owned" ? (
              <ChevronUp size={15} className="text-gray-500" />
            ) : (
              <ChevronDown size={15} className="text-gray-500" />
            )}
          </button>

          {activeSection === "owned" && (
            <div className="ml-7 mt-1 space-y-1 animate-in fade-in">
              {data?.data.ownedWorkspaces.map((workspace) => (
                <Link
                  href={`/workspaces/${workspace.id}?s=owned`}
                  key={workspace.id}
                  className="flex items-center gap-2 p-2 rounded-md transition-colors
                hover:bg-gray-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <HiOutlineSquare3Stack3D
                    size={15}
                    className="text-gray-500"
                  />
                  <span className="text-gray-700 text-sm whitespace-nowrap">
                    {workspace.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="group">
          <button
            onClick={() => {
              setActiveSection((prev) => (prev === "joined" ? null : "joined"));
            }}
            className="w-full p-2 flex items-center justify-between rounded-lg transition-all
          hover:bg-gray-50 active:bg-gray-100"
          >
            <div className="flex items-center gap-2 text-gray-700 whitespace-nowrap">
              <Users size={15} className="text-gray-600" />
              <span className="font-medium text-sm whitespace-nowrap">
                Joined Workspaces
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md">
                {data?.data.joinedWorkspaces.length || 0}
              </span>
            </div>
            {activeSection === "joined" ? (
              <ChevronUp size={15} className="text-gray-500" />
            ) : (
              <ChevronDown size={15} className="text-gray-500" />
            )}
          </button>

          {activeSection === "joined" && (
            <div className="ml-7 mt-1 space-y-1 animate-in fade-in">
              {data?.data.joinedWorkspaces.map((workspace) => (
                <Link
                  href={`/workspaces/${workspace.id}?s=joined`}
                  key={workspace.id}
                  className="flex items-center gap-2 p-2 rounded-md transition-colors
                hover:bg-gray-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <HiOutlineSquare3Stack3D
                    size={15}
                    className="text-gray-500"
                  />
                  <span className="text-gray-700 text-sm whitespace-nowrap">
                    {workspace.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 pb-4">
        <p className="font-semibold text-gray-800">Add Workspace</p>

        <div className="mt-2 space-y-2 text-sm">
          <input
            type="text"
            placeholder="Enter workspace name"
            value={newWorkspaceName || ""}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
          />

          <button
            onClick={() => addWorkspaceMutation.mutate()}
            disabled={
              !newWorkspaceName?.trim() || addWorkspaceMutation.isPending
            }
            className=" w-full 7px-4 py-2 bg-black text-white font-medium flex gap-2 justify-center items-center rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-all"
          >
            Create workspace 
            {
              addWorkspaceMutation.isPending && <Loader2 size={15} className="animate-spin"/>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
