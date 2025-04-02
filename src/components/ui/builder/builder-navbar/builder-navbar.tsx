"use client";

import { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import axios, { AxiosError } from "axios";
import { FormData } from "@/components/section/form-builder";

import { handleAxiosError } from "@/utility/axios-err-handler";
import useElements from "@/utility/useElements-hook";
import { FormElemetInstance } from "@/utility/ts-types";

import CopyToClipboard from "../../copy-to-clipboard";
import {
  CreateNextBtn,
  NextBtn,
  PreviousBtn,
  PublishBtn,
  SaveBtn,
  UnPublishBtn,
} from "./btns";
import { areElementsChanged } from "@/utility/compare-fns";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

interface BuilderNavbarProps {
  formData: FormData | undefined;
  workspaceId: string;
  page: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPage: number | undefined;
}

const BuilderNavbar: React.FC<BuilderNavbarProps> = ({
  formData,
  workspaceId,
  page,
  totalPage,
  setCurrentPage,
}) => {
  const session = useSession();
  const token = session.data?.accessToken;
  const queryClient = useQueryClient();
  const { elements } = useElements();
  const initialElements = useRef<FormElemetInstance[] | null>(null);
  const [isNextAvailable, setIsNextAvailable] = useState<boolean>(false);
  const [isSaveAllowed, setIsSaveAllowed] = useState<boolean>(false);
  const [workspaceName, setWorkspaceName] = useState<null | string>(null);
  const copyToClipboardText = `https://formwavelabs-frontend.vercel.app/submit/${formData?.id}`;

  useEffect(() => {
    if (totalPage && page < totalPage) {
      setIsNextAvailable(true);
    } else if (totalPage && (page === totalPage || page > totalPage)) {
      setIsNextAvailable(false);
    }
  }, [page, totalPage]);

  useEffect(() => {
    try {
      if (
        formData?.pages[0]?.content &&
        typeof formData.pages[0].content === "string"
      ) {
        const content = formData?.pages[0]?.content;
        initialElements.current = JSON.parse(content);
      } else {
        initialElements.current = null;
      }
    } catch (error) {
      console.error("Failed to parse initial elements:", error);
      initialElements.current = null;
    }
  }, [formData]);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const data = await fetch(
          `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const response = await data.json();
        setWorkspaceName(response.data.name);
      } catch (error) {
        console.log(handleAxiosError(error));
      }
    };

    fetchWorkspace();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    if (elements) {
      const hasChanged = areElementsChanged(initialElements.current, elements);
      setIsSaveAllowed(hasChanged);
    }
  }, [elements]);

  const savePageMutation = useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      await axios.patch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}/forms/${formData?.id}/pages?p=${formData?.pages[0].page}`,
        {
          pageId: formData?.pages[0].id,
          content: elements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["formData"] }),
    onError: (error) => console.error(handleAxiosError(error)),
  });

  const savePublishMutation = useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      await axios.patch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}/forms/${formData?.id}/status`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["formData"] }),
    onError: (error) => console.error(handleAxiosError(error)),
  });

  const createNextMutation = useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      const response = await axios.post(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}/forms/${formData?.id}/pages/next?p=${page}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setCurrentPage(response.data.data.page);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["formData"] }),
    onError: (error) => console.error(handleAxiosError(error)),
  });

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <div
    className={`flex flex-col md:flex-row justify-between items-center gap-2 py-2 w-full md:px-2`}
  >
    <div className="w-full md:w-1/3 text-black text-left flex items-center gap-1">
      <HiOutlineSquare3Stack3D />
      <Link
        href={`/workspaces/${workspaceId}`}
        className="font-bold text-sm text-gray-500 hover:underline whitespace-nowrap"
      >
        {workspaceName ? workspaceName : "loading..."}
      </Link>
      <ChevronsRight size={15} />
      {formData && formData?.title?.length > 15
        ? formData?.title.slice(0, 15)
        : formData?.title}
      ...
    </div>
  
    <div className="w-full md:w-2/3 flex  justify-between items-center">
      <div className="flex gap-2 items-center justify-start md:justify-center w-1/2">
        {page > 1 && (
          <PreviousBtn
            handlePrevious={handlePrevious}
            isSaveAllowed={isSaveAllowed}
          />
        )}
  
        <div className="bg-black p-1.5 px-2 text-sm rounded-md text-white">
          {page}/{totalPage}
        </div>

        <SaveBtn
          savePageMutation={savePageMutation}
          isSaveAllowed={isSaveAllowed}
        />

         {isNextAvailable ? (
          <NextBtn
            handleNextPage={handleNextPage}
            isSaveAllowed={isSaveAllowed}
          />
        ) : (
          initialElements.current &&
          initialElements.current?.length > 0 && (
            <CreateNextBtn
              createNextMutation={createNextMutation}
              isSaveAllowed={isSaveAllowed}
            />
          )
        )}
      </div>
  
      <div className="flex gap-2 items-center w-1/2 justify-end">
        {formData?.status ? (
          <>
            <UnPublishBtn savePublishMutation={savePublishMutation} />
            <CopyToClipboard
              textToCopy={copyToClipboardText}
              className="py-2 px-2"
            />
          </>
        ) : (
          initialElements.current &&
          initialElements.current?.length > 0 && (
            <PublishBtn
              savePublishMutation={savePublishMutation}
              isSaveAllowed={isSaveAllowed}
            />
          )
        )}
      </div>
    </div>
  </div>
  
  );
};

export default BuilderNavbar;
