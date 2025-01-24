"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { formDataInterface } from "@/components/section/form-builder";
import { handleAxiosError } from "@/utility/axios-err";
import useElements from "@/utility/useElements-hook";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormElemetInstance } from "@/utility/ts-types";
import { Link } from "lucide-react";

type TabType = "builder" | "preview";

interface BuilderNavbarProps {
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
  formData: formDataInterface | undefined;
  page: number;
}

const BuilderNavbar: React.FC<BuilderNavbarProps> = ({
  setTab,
  formData,
  page,
}) => {
  const { elements } = useElements();
  const queryClient = useQueryClient();
  const initialElements = useRef<FormElemetInstance[] | null>(null);
  const [isSaveAllowed, setIsSaveAllowed] = useState<boolean>(false);
  const [isPublishAllowed, setIsPublishedAllowed] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const copyToClipboardText =  `https://formwavelabs-frontend.vercel.app/submit/${formData?.id}`; 
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (
        formData?.pages[0]?.content &&
        typeof formData.pages[0].content === "string"
      ) {
        initialElements.current = JSON.parse(formData.pages[0].content);
        // console.log("Initial elements parsed:", initialElements.current);
      } else {
        initialElements.current = null;
      }
    } catch (error) {
      console.error("Failed to parse initial elements:", error);
      initialElements.current = null;
    }
  }, [formData]);

  useEffect(() => {
    const areElementsChanged = (
      arr1: FormElemetInstance[] | null,
      arr2: FormElemetInstance[]
    ): boolean => {
      if (!arr1 || arr1.length === 0) {
        return arr2.length > 0;
      }

      if (arr1.length !== arr2.length) return true;

      const compareObjects = (
        obj1: FormElemetInstance,
        obj2: FormElemetInstance
      ): boolean => {
        const keys1 = Object.keys(obj1) as (keyof FormElemetInstance)[];
        const keys2 = Object.keys(obj2) as (keyof FormElemetInstance)[];

        if (keys1.length !== keys2.length) return true;

        return keys1.some((key) => {
          const val1 = obj1[key];
          const val2 = obj2[key];

          if (typeof val1 === "object" && typeof val2 === "object") {
            if (Array.isArray(val1) && Array.isArray(val2)) {
              return JSON.stringify(val1) !== JSON.stringify(val2);
            }
            return compareObjects(
              val1 as FormElemetInstance,
              val2 as FormElemetInstance
            );
          }

          return val1 !== val2;
        });
      };

      return arr1.some((originalObj, index) =>
        compareObjects(originalObj, arr2[index])
      );
    };

    if (elements) {
      const hasChanged = areElementsChanged(initialElements.current, elements);
      setIsSaveAllowed(hasChanged);
      console.log("Change detected:", hasChanged);
    }

    // console.log("Initial array:", initialElements.current);
    // console.log("Current elements:", elements);
  }, [elements]);

  useEffect(() => {
    if (elements.length > 0) {
      setIsPublishedAllowed(true);
    }
  }, [elements]);

  const router = useRouter();

  const savePageMutation = useMutation({
    mutationFn: async () => {
      if (!formData?.id || !formData.pages[0]) {
        throw new Error("Invalid form data");
      }

      const response = await axios.put(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData.id}/page?p=${formData.pages[0].page}`,
        {
          pageId: formData.pages[0].id,
          content: elements,
        },
        { withCredentials: true }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["formData"],
      });

      console.log("Page saved successfully");
    },
    onError: (error) => {
      const errorMessage = handleAxiosError(error);
      console.error("Save failed:", errorMessage);
    },
  });

  const handleSavePage = () => {
    savePageMutation.mutate();
  };

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveAndNext = async () => {
    try {
      setIsSaved(true);

      const response = await axios.post(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/page?p=${page}`,
        {
          pageId: formData?.pages[0].id,
          content: elements,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);
      setIsSaved(false);

      if (response.data.status === "success") {
        router.push(`/form/${formData?.id}/${response.data.data.page}/builder`);
      }
    } catch (error) {
      console.log(handleAxiosError(error));
      setIsSaved(false);
    }
  };

  const savePublishMutation = useMutation({
    mutationFn: async () => {
      if (!formData?.id) {
        throw new Error("Invalid form data");
      }

      setIsPublishing(true);

      await axios.patch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/status`,
        null,
        {
          withCredentials: true,
        }
      );

      setIsPublishing(false);
      // console.log(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["formData"],
      });
    },
    onError: (error) => {
      const errorMessage = handleAxiosError(error);
      console.error("publish failed:", errorMessage);
    },
  });

  const handlePublish = () => {
    savePublishMutation.mutate();
  };

  return (
    <div className="flex justify-between items-center border h-12 gap-2 px-4">
      <div>
        <p>{formData?.title}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab("builder")} className="border px-2">
          Builder
        </button>

        <button onClick={() => setTab("preview")} className="border px-2">
          Preview
        </button>

        <button
          onClick={handleSavePage}
          disabled={!isSaveAllowed || savePageMutation.isPending}
          className={`border px-2 ${
            !isSaveAllowed || savePageMutation.isPending
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {savePageMutation.isPending ? "Saving..." : "Save"}
        </button>

        <button
          onClick={handleSaveAndNext}
          disabled={isSaved}
          className={`border px-2 ${
            isSaved ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSaved ? "Saving..." : "Save and next"}
        </button>

        {formData?.status ? (
          <div className="flex gap-2">
          <button 
           className={`border px-2 bg-red-100`}
          onClick={handlePublish}
          >
            {isPublishing ? "unpublishing": "unpublish"}
          </button>


          <button 
           className={`border p-2 rounded-md flex gap-2 items-center ${isCopied ? "bg-green-200": "bg-transparent"}`}
           onClick={() => {
            navigator.clipboard.writeText(copyToClipboardText) .then(() => {
              console.log('Text copied to clipboard');
              setIsCopied(true);

              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            })
            .catch(err => {
              console.error('Failed to copy text: ', err);
              setIsCopied(false);
            });
           }}
          >
           {isCopied ? "link copied" : "Public link"}   <Link size={15}/>
          </button>
          
          </div>
        ) : (
          <button
            onClick={handlePublish}
            disabled={!isPublishAllowed}
            className={`border px-2 ${
              !isPublishAllowed
                ? "opacity-50 cursor-not-allowed bg-transparent"
                : " bg-green-300"
            }`}
          >
            {isPublishing ? "publishing..." : "publish"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BuilderNavbar;
