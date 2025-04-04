"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BuilderNavbar from "../ui/builder/builder-navbar/builder-navbar";
import useElements from "@/utility/useElements-hook";
import { handleAxiosError } from "@/utility/axios-err-handler";
import { FormElemetInstance } from "@/utility/ts-types";
import { FormElemets } from "@/utility/static-data";
import BuilderLoading from "../ui/builder/builder-loading";
import useMediaQuery from "@/utility/useMediaQuery-hook";
import DesktopFormBuilder from "../ui/builder/desktop-builder/desktop-form-builder";
import MobileFormBuilder from "../ui/builder/mobile-builder/mobile-form-builder";

export interface FormPageData {
  id: string;
  content: string;
  page: number;
}

export interface FormData {
  pages: FormPageData[];
  id: string;
  title: string;
  status: boolean;
  totalPages: number;
  theme: "BOXY" | "ROUNDED";
}

const FormBuilder = ({
  formId,
  workspaceId,
}: {
  formId: string;
  workspaceId: string;
}) => {
  const { setElements } = useElements();
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { selectedElementInstance } = useElements();

  const isMobile = useMediaQuery("(max-width: 768px)");

  let ElementEditSetting = null;
  if (selectedElementInstance) {
    ElementEditSetting = FormElemets[selectedElementInstance?.type].setting;
  }

  const {
    data: formData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["formData", formId, currentPage],
    queryFn: async () => {
      const response = await axios.get(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}/forms/${formId}/pages?p=${currentPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data as FormData;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 5,
  });

  useEffect(() => {
    if (!formData?.pages[0]?.content) {
      setElements([]);
      return;
    }

    try {
      const parsedData = JSON.parse(
        formData.pages[0].content
      ) as FormElemetInstance[];
      setElements(parsedData);
    } catch {
      setElements([]);
    }
  }, [formData, setElements]);

  if (isLoading) {
    return <BuilderLoading />;
  }

  if (error) {
    return <ErrorScreen error={error} workspaceId={workspaceId} />;
  }

  return (
    <div className="w-full max-w-[1500px] h-full flex flex-col gap-2 px-2 md:px-0 bg-white mx-auto">
      {selectedElementInstance && ElementEditSetting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10] flex">
          <div className="py-10 w-full overflow-y-auto">
            <div className="min-h-[calc(100vh-2rem)] w-[90%] md:w-auto flex items-start justify-center mx-auto">
              <ElementEditSetting elementInstance={selectedElementInstance} workspaceId={workspaceId} />
            </div>
          </div>
        </div>
      )}

      <div className="min-h-[50px] h-auto md:h-[7%] flex justify-center items-center">
        <BuilderNavbar
          formData={formData} 
          workspaceId={workspaceId}
          page={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={formData?.totalPages}
        />
      </div>

      <div className="h-[90%] md:h-[93%] overflow-x-hidden">
        {isMobile ? (
          <MobileFormBuilder theme={formData?.theme} />
        ) : (
          <DesktopFormBuilder theme={formData?.theme} />
        )}
      </div>
    </div>
  );
};

const ErrorScreen = ({
  error,
  workspaceId,
}: {
  error: unknown;
  workspaceId: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <p className="text-red-500 font-medium">{handleAxiosError(error)}</p>
      <Link
        href={`/workspaces/${workspaceId}`}
        className="border p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
      >
        Go back to form
      </Link>
    </div>
  );
};

export default FormBuilder;