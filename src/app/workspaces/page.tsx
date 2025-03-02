"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Workspaces = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!token) return;

     setLoading(true);
      const res = await fetch(
        "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const workspaces = await res.json();
      const firstOwnerWorkspace = workspaces?.data?.ownedWorkspaces?.[0]?.id;

      console.log(firstOwnerWorkspace)

      if (firstOwnerWorkspace) {
        router.push(`/workspaces/${firstOwnerWorkspace}`);
      } else {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  if (loading) return <div className="w-full h-full flex justify-center items-center" >Loading...</div>;

  return <div className="w-full h-full flex justify-center items-center">No workspaces found.</div>;
};

export default Workspaces;

