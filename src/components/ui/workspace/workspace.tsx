"use client";
import React, { useEffect, useState } from "react";
import FormCard from "../form-card";
import { useSession } from "next-auth/react";
import WorkspaceNavbar from "./workspace-navbar";
import WorkspaceSidebarMobile from "./workspace-sidebar-mobile";
import { useQuery } from "@tanstack/react-query";
import WorkSpaceInviteModal from "./workspace-invite-modal";
import WorkspaceCreateForm from "./workspace-create-form";

export interface MemberInterface {
  role: string;
  user: {
    id: string;
    name: string;
  };
}

interface Form {
  id: string;
  title: string;
  status: boolean;
  _count: { pages: number; submissions: number };
  createdAt: string;
}

interface WorkspaceData {
  forms: Form[];
  members: MemberInterface[];
  id: string;
  name: string;
}

interface WorkspaceDataInterface {
  status: "success" | "error";
  data: WorkspaceData;
  message: string;
}

const Workspace = ({ wsId }: { wsId: string }) => {
  const currentUserData = useSession().data;
  const [workspaceData, setWorkspaceData] =
    useState<WorkspaceDataInterface | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
  const [isCreateFormModal, setCreateFormModal] = useState<boolean>(false);
  const [userRole, setRole] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["workspace", wsId],
    queryFn: async () => {
      const res = await fetch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUserData?.accessToken}`,
          },
        }
      );

      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setWorkspaceData(data);
      return data;
    },
    enabled: Boolean(wsId),
  });

  useEffect(() => {
    const currentUser = workspaceData?.data.members?.find(
      (member) => member?.user?.id === currentUserData?.user.id
    );

    setRole(currentUser ? currentUser.role : null);
  }, [workspaceData, data]);

  return (
    <div className="w-full h-full overflow-auto bg-gray-100 px-2 md:px-4 shadow-inner">
      <div className="h-[6%] flex items-center gap-2">
        <WorkspaceNavbar
          workspaceName={workspaceData?.data.name}
          userRole={userRole}
          members={workspaceData?.data.members}
          membersCount={workspaceData?.data?.members?.length}
          setIsSidebarOpen={setIsSidebarOpen}
          wsId={wsId}
          setInviteModalOpen={setInviteModalOpen}
          setCreateFormModal={setCreateFormModal}
        />
      </div>

      <div className="h-[94%] w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-tl-md rounded-tr-md overflow-y-scroll bg-white/50 border">
        {workspaceData?.data.forms ? (
          workspaceData.data.forms?.map((form) => (
            <FormCard
              key={form.id}
              formId={form.id}
              workspaceId={workspaceData.data.id}
              title={form.title}
              status={form.status}
              submissions={form._count.submissions}
            />
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            No Forms in this workspace.
          </div>
        )}
      </div>

      <WorkspaceSidebarMobile
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />

      {isInviteModalOpen && (
        <WorkSpaceInviteModal
          wsId={wsId}
          workspaceName={workspaceData?.data.name}
          isInviteModalOpen={isInviteModalOpen}
          setInviteModalOpen={setInviteModalOpen}
        />
      )}

      {isCreateFormModal && (
        <WorkspaceCreateForm
          wsId={wsId}
          workspaceName={workspaceData?.data.name}
          isCreateFormModal={isCreateFormModal}
          setCreateFormModal={setCreateFormModal}
        />
      )}
    </div>
  );
};

export default Workspace;
