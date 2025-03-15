"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";

interface Member {
  user: {
    id: string;
    name: string;
  };
  id: string;
  role: "EDITOR" | "VIEWER" | "ADMIN" | "OWNER";
}

interface MembersInterface {
  status: boolean;
  message: string;
  data: Member[];
}

const WorkspaceMembers = ({
  userRole,
  wsId,
  setIsMembersModalOpen
}: {
  userRole: string | null;
  wsId: string;
  setIsMembersModalOpen: Dispatch<SetStateAction<boolean>>; 
}) => {
  const currentUserData = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/members`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUserData.data?.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch members.");
      }

      const data = (await res.json()) as MembersInterface | undefined;
      return data;
    },
    refetchOnWindowFocus: true,
  });

  const leaveMutation = useMutation({
    mutationFn: async () => {
      const data = await fetch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/leave`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${currentUserData.data?.accessToken}`,
          },
        }
      );

      const response = await data.json();
      return response;
    },
    onSuccess: () => router.push("/workspaces"),
    onError: (error) => console.error("Failed to leave workspace:", error),
  });

  const removeMutation = useMutation({
    mutationFn: async (memberId: string) => {
      const data = await fetch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/remove/${memberId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${currentUserData.data?.accessToken}`,
          },
        }
      );

      const response = await data.json();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members"] }),
    onError: (error) => console.error("Failed to remvoe the member:", error),
  });

  return (
    <div className="min-w-[320px] h-[400px] max-h-[400px] rounded-lg absolute top-12 right-0 bg-white border border-gray-200 shadow-lg z-50">
       <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Members</h2>
        <button 
          onClick={() => setIsMembersModalOpen(false)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 size={15} className=" animate-spin" />
        </div>
      ) : (
        <div className="h-full w-full overflow-y-auto p-2 text-sm">
          <div className="grid grid-cols-[40px_minmax(100px,1fr)_auto_auto] items-center gap-x-2 gap-y-2 mr-1">
            <div className="text-gray-500 text-xs font-bold uppercase text-center">
              SN
            </div>
            <div className="text-gray-500 text-xs font-bold uppercase text-left">
              Name
            </div>
            <div className="text-gray-500 text-xs font-bold uppercase text-left">
              Role
            </div>
            <div className="w-[76px]"></div>

            {data?.data?.length === 0 ? (
              <p className="text-gray-500 text-center col-span-4 py-2">
                No members found
              </p>
            ) : (
              data?.data?.map((member, index) => (
                <div
                  key={index}
                  className="contents group hover:bg-gray-50 rounded px-2 py-1.5 transition-colors"
                >
                  <div className="text-black font-medium text-center">
                    {index + 1}
                  </div>
                  <div className="text-black font-medium truncate text-left">
                    {member?.user?.id === currentUserData.data?.user.id
                      ? "You"
                      : member.user.name}
                  </div>
                  <div className="text-gray-500 text-sm text-left">
                    {member?.role}
                  </div>

                  <div className="flex gap-2 justify-end w-[76px] ml-3">
                    {userRole !== "OWNER" &&
                    member.user.id === currentUserData.data?.user.id ? (
                      <button
                        className="text-xs px-2 py-1 rounded-md text-red-600 hover:bg-red-50 transition-colors flex justify-center items-center gap-2"
                        onClick={(e) =>{
                          e.stopPropagation()
                          leaveMutation.mutate()}
                        }
                      >
                        Leave
                        {leaveMutation.isPending && (
                          <Loader2 className=" animate-spin" size={15} />
                        )}
                      </button>
                    ) : (userRole === "OWNER" || userRole === "ADMIN") &&
                      member.user.id !== currentUserData.data?.user.id &&
                      member.role !== "OWNER" ? (
                      <button
                        className="text-xs px-2 py-1 rounded-md text-red-600 hover:bg-red-50 transition-colors flex justify-center items-center gap-2"
                        onClick={(e) =>{ 
                          e.stopPropagation();
                          removeMutation.mutate(member.user.id)}
                        }
                      >
                        Remove
                        {removeMutation.isPending && (
                          <Loader2 className=" animate-spin" size={15} />
                        )}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceMembers;
