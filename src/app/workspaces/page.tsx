"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Workspaces = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const controller = new AbortController();
        const res = await fetch(
          "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces",
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal
          }
        );

        if (!res.ok) throw new Error("Failed to fetch workspaces");

        const workspaces = await res.json();
        const firstOwnerWorkspace = workspaces?.data?.ownedWorkspaces?.[0]?.id;

        if (firstOwnerWorkspace) {
          router.push(`/workspaces/${firstOwnerWorkspace}`);
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();

    return () => setLoading(false); 
  }, [token, router]);

  if (loading) return <div className="w-full h-full flex justify-center items-center">Loading...</div>;

  return <div className="w-full h-full flex justify-center items-center">No workspaces found.</div>;
};

export default Workspaces;