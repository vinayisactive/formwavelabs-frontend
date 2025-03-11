"use client"

import React from 'react'
import { MemberInterface } from './workspace'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'


const WorkspaceMembers = ({members, userRole, wsId} : {
    members: MemberInterface[] | undefined;
    userRole: string | null; 
    wsId: string
}) => {
    const currentUser = useSession().data;


    const queryClient = useQueryClient(); 
    const router = useRouter();

    const leaveMutation = useMutation({
        mutationFn: async() => {
            const data = await fetch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/leave`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${currentUser?.accessToken}`,
                }
            }); 

            const response = await data.json(); 
            console.log(response);
            return response; 
        },
        onSuccess: () => router.push("/workspaces"),
        onError: (error) => console.error("Failed to leave workspace:", error),
    });


    const removeMutation = useMutation({
        mutationFn: async(memberId: string) => {
            const data = await fetch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/remove/${memberId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${currentUser?.accessToken}`
                }
            }); 

            const response = await data.json(); 
            console.log(response);
            return response; 
        }, 
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["workspace"]}),
        onError: (error) => console.error("Failed to remvoe the member:", error)
    })

  return (
    <div className="min-w-[320px] rounded-lg absolute top-12 right-0 bg-white border border-gray-200 shadow-lg z-50">
   
    <div className="max-h-[300px] overflow-y-auto p-3 text-sm">
      <div className="grid grid-cols-[40px_minmax(100px,1fr)_auto_auto] items-center gap-x-2 gap-y-2">
      
        <div className="text-gray-500 text-xs font-bold uppercase text-center">SN</div>
        <div className="text-gray-500 text-xs font-bold uppercase text-left">Name</div>
        <div className="text-gray-500 text-xs font-bold uppercase text-left">Role</div>
        <div className="w-[76px]"></div>
        
        {members?.length === 0 ? (
          <p className="text-gray-500 text-center col-span-4 py-2">No members found</p>
        ) : (
          members?.map((member, index) => (
            <div key={index} className="contents group hover:bg-gray-50 rounded px-2 py-1.5 transition-colors">
              <div className="text-black font-medium text-center">{index + 1}</div>
              <div className="text-black font-medium truncate text-left">
                {member?.user?.id === currentUser?.user.id ? "You" : member.user.name}
              </div>
              <div className="text-gray-500 text-sm text-left">{member?.role}</div>
             
              <div className="flex justify-end w-[76px]">
                {(userRole !== "OWNER" && member.user.id === currentUser?.user.id) ? (
                  <button className="text-xs px-2 py-1 rounded-md text-red-600 hover:bg-red-50 transition-colors" onClick={() => leaveMutation.mutate()}>
                    Leave
                  </button>
                ) : (userRole === "OWNER" || userRole === "ADMIN") && 
                  member.user.id !== currentUser?.user.id && member.role !== "OWNER" ? (
                  <button className="text-xs px-2 py-1 rounded-md text-red-600 hover:bg-red-50 transition-colors" onClick={() => removeMutation.mutate(member.user.id)}>
                    Remove 
                  </button>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  )
}

export default WorkspaceMembers
