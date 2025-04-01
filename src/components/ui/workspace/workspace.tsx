"use client";
import React, { useEffect, useState } from "react";
import FormCard from "../form-card";
import { useSession } from "next-auth/react";
import WorkspaceNavbar from "./workspace-navbar";
import WorkspaceSidebarMobile from "./workspace-sidebar-mobile";
import { useQuery } from "@tanstack/react-query";
import WorkSpaceInviteModal from "./workspace-invite-modal";
import WorkspaceCreateForm from "./workspace-create-form";
import { Loader2 } from "lucide-react";
import useMediaQuery from "@/utility/useMediaQuery-hook";

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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
  const [isCreateFormModal, setCreateFormModal] = useState<boolean>(false);
  const [userRole, setRole] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
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
      const data = await res.json() as WorkspaceDataInterface
      return data;
    },
    enabled: Boolean(wsId),
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    const currentUser = data?.data.members?.find(
      (member) => member?.user?.id === currentUserData?.user.id
    );

    setRole(currentUser ? currentUser.role : null);
  }, [currentUserData?.user.id, data]);

  return (
    <div className="w-full h-full overflow-auto bg-gray-100 px-2 flex flex-col gap-0 justify-center md:px-4 shadow-inner">
        <WorkspaceNavbar
          workspaceName={data?.data.name}
          userRole={userRole}
          membersCount={data?.data?.members?.length}
          setIsSidebarOpen={setIsSidebarOpen}
          wsId={wsId}
          setInviteModalOpen={setInviteModalOpen}
          setCreateFormModal={setCreateFormModal}
        />

      <div className="h-[94%] w-full rounded-tl-xl rounded-tr-xl  bg-white/50 border">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader2 className=" animate-spin" />
          </div>
        ) : (
          <div className="w-full h-full">
            {data?.data.forms.length ? (
              <div className="h-full w-full p-4 space-y-4 overflow-y-scroll">
                {data?.data.forms &&
                  data.data.forms?.map((form) => (
                    <FormCard
                      key={form.id}
                      formId={form.id}
                      workspaceId={data.data.id}
                      title={form.title}
                      status={form.status}
                      submissions={form._count.submissions}
                      userRole={userRole}
                    />
                  ))}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                No Forms in this workspace.
              </div>
            )}
          </div>
        )}

        {isMobile && <WorkspaceSidebarMobile setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />}

        {isInviteModalOpen && (
          <WorkSpaceInviteModal
            wsId={wsId}
            workspaceName={data?.data.name}
            isInviteModalOpen={isInviteModalOpen}
            setInviteModalOpen={setInviteModalOpen}
          />
        )}

        {isCreateFormModal && (
          <WorkspaceCreateForm
            wsId={wsId}
            workspaceName={data?.data.name}
            isCreateFormModal={isCreateFormModal}
            setCreateFormModal={setCreateFormModal}
          />
        )}
      </div>
    </div>
  );
};

export default Workspace;
