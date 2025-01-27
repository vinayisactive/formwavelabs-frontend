"use client";

import React, { useState, useEffect } from "react";
import Builder from "../ui/builder/builder";
import Preview from "../ui/preview/preview";
import BuilderNavbar from "../ui/nav/builder-navbar";
import axios from "axios";
import { Loader } from "lucide-react";
import { handleAxiosError } from "@/utility/axios-err";
import { useQuery } from "@tanstack/react-query";
import useElements from "@/utility/useElements-hook";
import { FormElemetInstance } from "@/utility/ts-types";
import Link from "next/link";
import { useSession } from "next-auth/react";

type TabType = "preview" | "builder";

export interface formPageDataInterface {
  id: string;
  content: string;
  page: number;
}
export interface formDataInterface {
  pages: formPageDataInterface[];
  id: string;
  title: string;
  status: boolean;
}

const FormBuilder = ({ formId, page }: { formId: string; page: number }) => {
  const [tab, setTab] = useState<TabType>("builder");
  const { setElements } = useElements();

  const session = useSession(); 
  const token = session.data?.accessToken;
  
  const {
    data: formData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["formData", formId, page],
    queryFn: async () => {
      const response = await axios.get(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/with-page?p=${page}`,
        {
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        }
      );

      return response.data.data as formDataInterface;
    },

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 2,
  });

  useEffect(() => {
    if (formData && typeof formData.pages[0].content === "string") {
      const data = JSON.parse(
        formData.pages[0]?.content
      ) as FormElemetInstance[];
      setElements(data);
    } else {
      setElements([]);
    }
  }, [formData]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isLoading && <Loader className="animate-spin text-gray-500 w-10 h-10" />}

      {error ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p>{handleAxiosError(error)}</p>
          <Link href={`/form/${formId}/1/builder`} className="border p-2">Go back to form</Link>
        </div>
      ) : (
        !isLoading && <div className="w-full h-full">
          <BuilderNavbar setTab={setTab} formData={formData} page={page} />

          {tab === "builder" ? <Builder /> : <Preview />}
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
