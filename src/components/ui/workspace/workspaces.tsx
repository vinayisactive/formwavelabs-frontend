"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
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

const WorkspaceSection = ({ 
  title, 
  sectionType, 
  workspaces,
  setActiveSection,
  activeSection,
  wsId 
}: {
  title: string;
  sectionType: "owned" | "joined";
  workspaces: Workspace[] | undefined;
  setActiveSection: Dispatch<SetStateAction<"owned" | "joined" | null>>; 
  activeSection: "owned" | "joined" | null; 
  wsId: string;
}) => (
  <div>
    <button
      onClick={() => setActiveSection(prev => prev === sectionType ? null : sectionType)}
      className="w-full p-2 flex items-center justify-start gap-3 rounded-lg transition-all hover:bg-gray-50 active:bg-gray-100"
    >
      {activeSection === sectionType ? (
        <ChevronUp size={15} className="text-gray-500" />
      ) : (
        <ChevronDown size={15} className="text-gray-500" />
      )}
      <span className="font-medium text-sm whitespace-nowrap">{title}</span>
    </button>

    {activeSection === sectionType && (
      <div className="mt-1 flex flex-col ml-7">
        {workspaces?.map((workspace) => (
          <Link
            href={`/workspaces/${workspace.id}?s=${sectionType}`}
            key={workspace.id}
            className="flex items-center h-7 rounded-bl-2xl relative border-b-2 border-l-2 border-black/80 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={`p-1 text-sm whitespace-nowrap w-[95%] absolute top-3 left-5 z-30 rounded-lg px-2 bg-[#f1f1f1] ${
                workspace.id === wsId ? "text-black font-bold" : "text-gray-400"
              }`}
            >
              {workspace.name}
            </span>
          </Link>
        ))}
      </div>
    )}
  </div>
);

const Workspaces = ({ setCreateWorkspaceModal, wsId }: { 
  setCreateWorkspaceModal: Dispatch<SetStateAction<boolean>>;
  wsId: string;
}) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<"owned" | "joined" | null>(
    searchParams.get("s") === "owned" || searchParams.get("s") === "joined" 
      ? searchParams.get("s") as "owned" | "joined" 
      : "owned"
  );

  const { data, isLoading, error } = useQuery<WorkspacesData>({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await fetch(
        "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces",
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
      if (!response.ok) throw new Error("Failed to fetch workspaces");
      return response.json();
    },
    retry: 5,
  });


  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500 text-sm">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-5 p-2 w-full h-full flex flex-col bg-[#f1f1f1]">
      <Link href="/" className="hidden md:flex text-lg mt-1 text-black font-bold">
        Home &gt; Workspaces
      </Link>

      <button
        className="bg-black w-full text-white flex justify-center items-center rounded-xl p-2 whitespace-nowrap"
        onClick={() => setCreateWorkspaceModal(true)}
      >
        Create Workspace
      </button>

      <div className="space-y-2 overflow-y-auto overflow-x-hidden flex-grow">
        <WorkspaceSection
          title="Personal"
          sectionType="owned"
          workspaces={data?.data.ownedWorkspaces}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          wsId={wsId}
        />

        <WorkspaceSection
          title="Joined"
          sectionType="joined"
          workspaces={data?.data.joinedWorkspaces}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          wsId={wsId}
        />
      </div>
    </div>
  );
};

export default Workspaces;