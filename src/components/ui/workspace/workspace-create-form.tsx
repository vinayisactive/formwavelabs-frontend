"use client";
import { handleAxiosError } from "@/utility/axios-err-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader, X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CreateFormInterface {
  title: string;
  description: string;
  theme: "ROUNDED" | "BOXY";
}

const WorkspaceCreateForm = ({
  wsId,
  workspaceName,
  isCreateFormModal,
  setCreateFormModal,
}: {
  wsId: string;
  workspaceName: string | undefined;
  isCreateFormModal: boolean;
  setCreateFormModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const currentUserData = useSession();

  const [formDetails, setFormDetails] = useState<CreateFormInterface>({
    title: "",
    description: "",
    theme: "ROUNDED",
  });

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    setIsValid(formDetails.title.trim().length > 0);
  }, [formDetails.title]);

  const createFormMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/forms`,
        formDetails,
        {
          headers: {
            Authorization: `Bearer ${currentUserData.data?.accessToken}`,
          },
        }
      );

      console.log(response);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workspace"] }),
    onError: (error) => setErrorMsg(handleAxiosError(error)),
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClose = () => {
    setCreateFormModal((prev) => !prev);
  };

  if (!isCreateFormModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-100/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className=" w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white p-6 rounded-xl shadow-2xl border border-gray-200 animate-in max-w-xl">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create New Form
            </h1>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>In</span>
              <span className="font-medium text-gray-700">{workspaceName}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm hover:bg-gray-50 p-1.5 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createFormMutation.mutate();
          }}
          className="space-y-6"
        >
          <div className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Form Title
              </label>
              <input
                type="text"
                name="title"
                value={formDetails.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 outline-none transition-all"
                placeholder="Enter form title"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Description (optional)
              </label>
              <input
                type="text"
                name="description"
                value={formDetails.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 outline-none transition-all"
                placeholder="Form description"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Form Theme
              </label>

              <div className="flex gap-4 justify-center items-center">
                <button
                  type="button"
                  onClick={() =>
                    setFormDetails((prev) => ({ ...prev, theme: "ROUNDED" }))
                  }
                  className={`max-w-[200px] p-4 border-2 ${
                    formDetails.theme === "ROUNDED"
                      ? "border-black"
                      : "border-gray-200"
                  } bg-white rounded-xl transition-all`}
                >
                  <div className="space-y-2">
                    <div className="h-16 bg-gray-100 rounded-xl mb-2" />
                    <span className="text-sm font-medium">Rounded</span>
                    <p className="text-xs text-gray-500">
                      Soft rounded corners
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormDetails((prev) => ({ ...prev, theme: "BOXY" }))
                  }
                  className={`max-w-[200px] p-4 border-2 ${
                    formDetails.theme === "BOXY"
                      ? "border-black"
                      : "border-gray-200"
                  } bg-white rounded-xl transition-all`}
                >
                  <div className="space-y-2">
                    <div className="h-16 bg-gray-100 rounded-none mb-2" />
                    <span className="text-sm font-medium">Boxy</span>
                    <p className="text-xs text-gray-500">
                      Sharp rectangular edges
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">
                {errorMsg}
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValid || createFormMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-gray-900"
              >
                {createFormMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Form"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceCreateForm;
