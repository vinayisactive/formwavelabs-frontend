"use client";

import { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import axios from "axios";
import { FormData } from "@/components/section/form-builder";

import { handleAxiosError } from "@/utility/axios-err";
import useElements from "@/utility/useElements-hook";
import { FormElemetInstance } from "@/utility/ts-types";

import CopyToClipboard from "../copy-to-clipboard";
import { Loader } from "lucide-react";

type TabType = "builder" | "preview";

interface BuilderNavbarProps {
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
  formData: FormData | undefined;
  page: number;
  totalPage: number | undefined;
}

const BuilderNavbar: React.FC<BuilderNavbarProps> = ({
  setTab,
  formData,
  page,
  totalPage,
}) => {
  const session = useSession();
  const token = session.data?.accessToken;

  const queryClient = useQueryClient();
  const router = useRouter();

  const { elements } = useElements();
  const initialElements = useRef<FormElemetInstance[] | null>(null);

  const [isNextAvailable, setIsNextAvailable] = useState<boolean>(false);

  const [isSaveAllowed, setIsSaveAllowed] = useState<boolean>(false);
  const [isPublishAllowed, setIsPublishedAllowed] = useState<boolean>(false);

  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isNextSaving, setIsNextSaving] = useState<boolean>(false);

  const [isNextFetching, setIsNextFetching] = useState<boolean>(false);
  const [isNextCreating, setIsNextCreating] = useState<boolean>(false)

  const copyToClipboardText = `https://formwavelabs-frontend.vercel.app/submit/${formData?.id}`;

  useEffect(() => {
    if (totalPage && page < totalPage) {
      setIsNextAvailable(true);
    } else if (totalPage && (page === totalPage || page > totalPage)) {
      setIsNextAvailable(false);
    }
  }, [page, totalPage]);

  //useEffect one for parsing data / [formData]
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

  //useEffect two for checking if saving is allowed or not / [elements]
  useEffect(() => {
    if (elements) {
      const hasChanged = areElementsChanged(initialElements.current, elements);
      setIsSaveAllowed(hasChanged);
    }
  }, [elements]);

  //useEffect three to handle if publishing is allowed or not  / [elements]
  useEffect(() => {
    if (elements.length > 0) {
      setIsPublishedAllowed(true);
    }
  }, [elements]);

  //useQuery save page mutation handler , revalidate formData query for updated elements data.
  const savePageMutation = useMutation({
    mutationFn: async () => {
      if (!formData?.id || !formData.pages[0]) {
        throw new Error("Invalid form data");
      }

      const response = await axios.patch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData.id}/page?p=${formData.pages[0].page}`,
        {
          pageId: formData.pages[0].id,
          content: elements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["formData"],
      });
    },
    onError: (error) => {
      const errorMessage = handleAxiosError(error);
      console.error("Save failed:", errorMessage);
    },
  });

  const handleSavePage = () => {
    savePageMutation.mutate();
  };

  // Save and Next handler
  const handleSaveAndNext = async () => {
    try {
      setIsNextSaving(true);

      const response = await axios.patch(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/page/next?p=${page}`,
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

      setIsNextSaving(false);

      if (response.data.status === "success") {
        router.push(`/form/${formData?.id}/${response.data.data.page}/builder`);
      }
    } catch (error) {
      console.log(handleAxiosError(error));
      setIsNextSaving(false);
    }
  };

  // publish/unpublish mutation handler, revalidate formData query for updated data.
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsPublishing(false);
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

  //next button handler for fetching next page
  const handleNext = async () => {
    try {

      setIsNextFetching(true);

      const response = await axios.get(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/page/next?p=${page}`,
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

  const handleCreateNext = async () => {
    try {

      setIsNextCreating(true);
      const response = await axios.post(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formData?.id}/page/next?p=${page}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsNextAvailable(false)
      if (response.data.status === "success") {
        router.push(`/form/${formData?.id}/${response.data.data.page}/builder`);
      }
    } catch (error) {
      console.error(handleAxiosError(error));
      setIsNextCreating(false);
    }
  };

  const handlePrevious = () => {
    router.push(`/form/${formData?.id}/${page - 1}/builder`);
  };

  return (
    <div className="flex justify-between items-center border-b h-14 gap-2 px-4 bg-white shadow-sm">
      <h1 className="text-md font-semibold text-gray-800">{formData?.title}</h1>

      {/* Builder and Preview buttons */}
      <div className="flex gap-2 items-center">
        <BuilderTabButton setTab={setTab} tab="builder" />
        <BuilderTabButton setTab={setTab} tab="preview" />
        <div className="h-6 w-px bg-gray-200 mx-2" />


      {/* Previous button */}
        {page > 1 && (
          <button
            onClick={handlePrevious}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-700`}
          >
            Previous
          </button>
        )}


        {/* Save page button */}
        {!isNextSaving && (
          <button
            onClick={handleSavePage}
            disabled={!isSaveAllowed || savePageMutation.isPending}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              !isSaveAllowed || savePageMutation.isPending
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            {savePageMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        )}


        {/* Save and next page button */}
        {!savePageMutation.isPending && isSaveAllowed && isNextAvailable && (
          <button
            onClick={handleSaveAndNext}
            disabled={!isSaveAllowed}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              !isSaveAllowed
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {isNextSaving ? "Saving..." : "Save & Next Page"}
          </button>
        )}


        {/* Next button */}
        {isNextAvailable && (
          <button
            onClick={handleNext}
            disabled={isNextFetching}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex gap-2 ${
              isNextFetching
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Next {isNextFetching && <Loader />} 
          </button>
        )}


        {!isNextAvailable && elements?.length > 0 && (
          <button
            onClick={handleCreateNext}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex gap-2 ${
              isNextCreating
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Create Next {isNextCreating && <Loader/>}
          </button>
        )}

        <div className="h-6 w-px bg-gray-200 mx-2" />


        {/* Publish section */}
        {formData?.status ? (
          <div className="flex gap-2 items-center">
            <button
              onClick={handlePublish}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-1"
            >
              {isPublishing ? (
                <>
                  <span className="animate-pulse">Unpublishing</span>
                </>
              ) : (
                "Unpublish Form"
              )}
            </button>
            <CopyToClipboard textToCopy={copyToClipboardText} />
          </div>
        ) : (
          <button
            onClick={handlePublish}
            disabled={!isPublishAllowed}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              !isPublishAllowed
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {isPublishing ? (
              <span className="animate-pulse">Publishing...</span>
            ) : (
              "Publish Form"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default BuilderNavbar;


const BuilderTabButton = ({
  setTab,
  tab,
}: {
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
  tab: "builder" | "preview";
}) => {
  return (
    <button
      onClick={() => setTab(tab)}
      className={`px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border`}
    >
      {tab === "builder" ? "Builder" : "Preview"}
    </button>
  );
};

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
