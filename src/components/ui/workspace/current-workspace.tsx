"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormCard from "../form-card";
import { useSession } from "next-auth/react";
import WorkspaceNavbar from "./workspace-navbar";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

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
  _count: { pages: number; submissions: number, visits: number };
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

const CurrentWorkspace = ({ wsId, setCreateWorkspaceModal }: { wsId: string, setCreateWorkspaceModal: Dispatch<SetStateAction<boolean>> }) => {
  const currentUserData = useSession().data;
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
    refetchOnWindowFocus: true,
    retry: 5
  });

  useEffect(() => {
    const currentUser = data?.data.members?.find(
      (member) => member?.user?.id === currentUserData?.user.id
    );

    setRole(currentUser ? currentUser.role : null);
  }, [currentUserData?.user.id, data]);

  return (
    <div className="w-full h-full overflow-auto bg-[#f1f1f1] px-2 flex flex-col gap-2 md:gap-0 justify-center md:px-4">
        <WorkspaceNavbar
          workspaceName={data?.data.name}
          setCreateWorkspaceModal={setCreateWorkspaceModal}
          userRole={userRole}
          membersCount={data?.data?.members?.length}
          wsId={wsId}
        />

      <div className="h-[90%] md:h-[94%] w-full rounded-tl-xl rounded-tr-xl  bg-white border">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader2 className=" animate-spin" />
          </div> 
        ) : (
          <div className="w-full h-full">
          {data?.data.forms.length ? (
            <div className="h-full w-full p-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.data.forms &&
                  data.data.forms?.map((form) => (
                    <FormCard
                      key={form.id}
                      formId={form.id}
                      title={form.title}
                      status={form.status}
                      submissions={form._count.submissions}
                      visits={form._count.visits}
                      userRole={userRole}
                    />
                  ))}
              </div>
            </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                No Forms in this workspace.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentWorkspace;
