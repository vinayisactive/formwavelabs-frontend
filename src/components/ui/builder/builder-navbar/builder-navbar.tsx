"use client";

import { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import axios, { AxiosError } from "axios";
import { FormData } from "@/components/section/form-builder";

import { handleAxiosError } from "@/utility/axios-err-handler";
import useElements from "@/utility/useElements-hook";
import { FormElemetInstance } from "@/utility/ts-types";

import CopyToClipboard from "../../copy-to-clipboard"
import { BuilderTabButton, CreateNextBtn, NextBtn, PreviousBtn, PublishBtn, SaveBtn, UnPublishBtn } from "../builder-navbar/builder-navbar-btns";
import { areElementsChanged } from "@/utility/compare-fns";

type TabType = "builder" | "preview";

interface BuilderNavbarProps {
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
  formData: FormData | undefined;
  page: number;
  totalPage: number | undefined;
}

const BuilderNavbar: React.FC<BuilderNavbarProps> = ({setTab, formData, page, totalPage}) => {
  const session = useSession();
  const token = session.data?.accessToken;
  const queryClient = useQueryClient();
  const router = useRouter();
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
       await axios.patch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/page?p=${formData?.pages[0].page}`,
        {
          pageId: formData?.pages[0].id,
          content: elements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );;
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["formData"]}),
    onError: (error) =>  console.error(handleAxiosError(error))
  });


  const savePublishMutation = useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      await axios.patch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/status`, null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["formData"]}),
    onError: (error) => console.error(handleAxiosError(error))
  });


  const createNextMutation = useMutation<void, AxiosError, void>({
        mutationFn: async() => {
            const response = await axios.post(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/page/next?p=${page}`,null,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                if(response.data.status  === "success"){
                  router.push(`/form/${formData?.id}/${response.data.data.page}/builder`)
                }
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["formData"]}),
        onError: (error) => console.error(handleAxiosError(error))
    });

    const handleNextPage = async () => {
      try {
        setIsNextFetching(true);
        const response = await axios.get(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/page/next?p=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setIsNextFetching(false);
        if (response.data.status === "success") {
          router.push(`/form/${formData?.id}/${response.data.data.page}/builder`);
        }
      } catch (error) {
        console.error(handleAxiosError(error));
        setIsNextFetching(false);
      }
    };

  const handlePrevious = () => {
    router.push(`/form/${formData?.id}/${page - 1}/builder`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b gap-2 px-2 md:px-4 py-1 bg-white shadow-sm">
      <h1 className="w-full text-sm text-black text-center">
        {formData?.title}
      </h1>
  
      <div className="flex gap-2 items-center">
        {["builder", "preview"].map((btn) => (
          <BuilderTabButton
            setTab={setTab}
            tab={btn === "preview" ? "preview" : "builder"}
            key={btn}
          />
        ))}
        <div className="hidden md:flex h-6 w-px bg-gray-200 mx-2" />
  
        {page > 1 && (
          <PreviousBtn handlePrevious={handlePrevious} />
        )}
  
        <SaveBtn 
          savePageMutation={savePageMutation} 
          isSaveAllowed={isSaveAllowed}
        />
  
        {isNextAvailable && (
          <NextBtn 
            handleNextPage={handleNextPage} 
            isNextFetching={isNextFetching}
          />
        )}
  
        {!isNextAvailable && elements?.length > 0 && (
          <CreateNextBtn createNextMutation={createNextMutation} />
        )}
  
        <div className="hidden md:flex h-6 w-px bg-gray-200 mx-2" />
  
        {formData?.status ? (
          <div className="flex gap-2 items-center">
            <UnPublishBtn savePublishMutation={savePublishMutation} />
            <CopyToClipboard textToCopy={copyToClipboardText} />
          </div>
        ) : (
          <PublishBtn 
            isNextAvailable={isNextAvailable} 
            savePublishMutation={savePublishMutation}
          />
        )}
      </div>
    </div>
  );
};

export default BuilderNavbar;