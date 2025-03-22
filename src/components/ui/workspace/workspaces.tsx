"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Users, Loader2, Box } from "lucide-react";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  const s = useSearchParams().get("s")

  const [activeSection, setActiveSection] = useState<"owned" | "joined" | null>(
    s === "owned" || s=== "joined" ? s :  "owned"
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
    <div className="mx-auto space-y-2 p-2 w-full">
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
            <span className="font-medium text-sm whitespace-nowrap">Your Workspaces</span>
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
                <HiOutlineSquare3Stack3D size={15} className="text-gray-500" />
                <span className="text-gray-700 text-sm whitespace-nowrap">{workspace.name}</span>
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
            <span className="font-medium text-sm whitespace-nowrap">Joined Workspaces</span>
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
                <HiOutlineSquare3Stack3D size={15} className="text-gray-500" />
                <span className="text-gray-700 text-sm whitespace-nowrap">{workspace.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspaces;
