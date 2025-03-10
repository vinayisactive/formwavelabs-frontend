"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

import BuilderPreview from "../ui/builder/builder-preview";
import BuilderNavbar from "../ui/builder/builder-navbar/builder-navbar";

import useElements from "@/utility/useElements-hook";
import { handleAxiosError } from "@/utility/axios-err-handler";
import { FormElemetInstance } from "@/utility/ts-types";

import ElementsContainer from "../ui/builder/elements-container/elements-container";
import ElementsReOrder from "../ui/builder/elements-reorder/elements-reorder";
import { FormElemets } from "@/utility/static-data";
import BuilderLoading from "../ui/builder/builder-loading";

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

const FormBuilder = ({ formId, workspaceId }: { formId: string, workspaceId: string}) => {
  const { setElements } = useElements();
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { selectedElementInstance } = useElements();

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


  console.log(formData);


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
    return (
      <BuilderLoading/>
    );
  }

  if (error) {
    return <ErrorScreen error={error} workspaceId={workspaceId} />;
  }

  return (
    <div className="w-full h-full px-2 md:px-0 bg-white">
      {selectedElementInstance && ElementEditSetting && (
        <div className="h-screen w-screen bg-black/50 px-2 py-5 flex justify-center items-center backdrop-blur-sm absolute overflow-y-auto scroll-smooth z-[10]">
          <ElementEditSetting elementInstance={selectedElementInstance} />
        </div>
      )}

      <div className="h-[7%]">
        <BuilderNavbar
          formData={formData}
          workspaceId={workspaceId}
          page={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={formData?.totalPages}
        />
      </div>

      <div className="h-[93%] w-full flex gap-2">
        <aside className="w-1/5 hidden md:flex">
          <ElementsContainer />
        </aside>

        <div
          className=" w-full md:w-3/5 rounded-tr-md  rounded-tl-md shadow-inner shadow-black/20 px-4"
          style={{
            backgroundColor: "#ffffff",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23aaaaaa' fill-opacity='0.45' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundPosition: "center",
          }}
        >
          <BuilderPreview formTheme={formData?.theme} />
        </div>

        <aside className="w-1/5 hidden md:flex">
          <ElementsReOrder />
        </aside>
      </div>
    </div>
  );
};

const ErrorScreen = ({ error, workspaceId }: { error: unknown; workspaceId: string }) => {
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