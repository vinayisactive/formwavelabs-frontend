"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Loader } from "lucide-react";

import BuilderPreview from "../ui/builder/builder-preview";
import BuilderNavbar from "../ui/builder/builder-navbar/builder-navbar";

import useElements from "@/utility/useElements-hook";
import { handleAxiosError } from "@/utility/axios-err-handler";
import { FormElemetInstance } from "@/utility/ts-types";
import BuilderSidebarDnd from "../ui/builder/builder-sidebar/builder-sidebar-dnd";

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
  theme: "BOXY" | "ROUNDED"
}

interface FormBuilderProps {
  formId: string;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ formId }) => {
  const { setElements } = useElements();
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: formData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["formData", formId, currentPage],
    queryFn: async () => {
      const response = await axios.get(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/page?p=${currentPage}`,
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
    if (formData?.pages[0]?.content) {
      try {
        const parsedData = JSON.parse(
          formData.pages[0].content
        ) as FormElemetInstance[];
        setElements(parsedData);
      } catch {
        setElements([]);
      }
    } else {
      setElements([]);
    }
  }, [formData, setElements]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {isLoading ? (
        <Loader className="animate-spin text-gray-500 w-10 h-10" />
      ) : error ? (
        <div className="flex flex-col items-center text-center space-y-4">
          <p className="text-red-500 font-medium">{handleAxiosError(error)}</p>
          <Link
            href={`/form/${formId}/1/builder`}
            className="border p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Go back to form
          </Link>
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="h-[6%] ">
            <BuilderNavbar
              formData={formData}
              page={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={formData?.totalPages}
            />
          </div>

          <div className="h-[94%] flex pr-2 gap-2">
            <BuilderSidebarDnd />
            <BuilderPreview formTheme={formData?.theme}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
