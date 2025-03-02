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
import { ChevronsRight } from "lucide-react";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";

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
  const [isNextFetching, setIsNextFetching] = useState<boolean>(false);
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

  const handleNextPage = async () => {
    try {
      setIsNextFetching(true);
      // const response = await axios.get(
      //   `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/page/next?p=${page}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      setCurrentPage((prev) => prev+1);

      setIsNextFetching(false);
      // if (response.data.status === "success") {

      // }
    } catch (error) {
      console.error(handleAxiosError(error));
      setIsNextFetching(false);
    }
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const workspace = "workspace";

  return (
    <div
      className={`flex flex-row justify-between items-center h-full w-full gap-2 px-2`}
    >
      <div className="text-sm w-1/3 text-black text-left md:flex justify-start items-center gap-1 hidden">
        <HiOutlineSquare3Stack3D />{" "}
        <span className="font-bold text-sm text-gray-500 hover:underline cursor-pointer">
          {workspace}
        </span>{" "}
        <ChevronsRight size={15} /> {formData?.title}
      </div>

      <div className="flex gap-2 items-center w-1/3 justify-center pl-2 md:pl-0">
        {page > 1 && (
          <PreviousBtn
            handlePrevious={handlePrevious}
            isSaveAllowed={isSaveAllowed}
          />
        )}

        <div className="bg-black p-1.5 px-2 text-sm rounded-md text-white">
          {page}/{totalPage}
        </div>

        {isNextAvailable ? (
          <NextBtn
            handleNextPage={handleNextPage}
            isNextFetching={isNextFetching}
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

        <SaveBtn
          savePageMutation={savePageMutation}
          isSaveAllowed={isSaveAllowed}
        />
      </div>

      <div className="flex gap-2 justify-end items-center w-1/3">
        {formData?.status ? (
          <>
            <UnPublishBtn savePublishMutation={savePublishMutation} />
            <CopyToClipboard textToCopy={copyToClipboardText} />
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
  );
};

export default BuilderNavbar;
