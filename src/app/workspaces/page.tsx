"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Workspaces = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const [loading, setLoading] = useState(true);
  const [hasWorkspace, setHasWorkspace] = useState<boolean | null>(null);
  const controllerRef = useRef<AbortController>(null);

  useEffect(() => {
    if (status === "loading") return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const fetchWorkspaces = async () => {
      try {
        setLoading(true);
        setHasWorkspace(null);

        if (!token) {
          setHasWorkspace(false);
          return;
        }

        const res = await fetch(
          "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces",
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
            cache: "no-store"
          }
        );

        if (!res.ok) throw new Error(res.statusText);

        const workspaces = await res.json();
        const firstOwnerWorkspace = workspaces?.data?.ownedWorkspaces?.[0]?.id;

        if (firstOwnerWorkspace) {
          router.push(`/workspaces/${firstOwnerWorkspace}?s=${"owned"}`);
        } else {
          setHasWorkspace(false);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Fetch error:", error);
          setHasWorkspace(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchWorkspaces();

    return () => controller.abort();
  }, [token, router, status]);

    return (
      <div className="w-full h-full flex justify-center items-center">
 {      loading ? "Loading..." : hasWorkspace === false ? "No workspaces found." : null}
      </div>
    );
  }

export default Workspaces;