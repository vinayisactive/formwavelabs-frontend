"use client";
import { handleAxiosError } from "@/utility/axios-err-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FileStack, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CreateFormInterface {
  title: string;
  description: string;
  theme: "ROUNDED" | "BOXY";
}

interface ModalProps {
  wsId: string;
  workspaceName: string | undefined;
  isCreateFormModal: boolean;
  setCreateFormModal: Dispatch<SetStateAction<boolean>>;
}

const FormHeader = ({ workspaceName }: { workspaceName?: string }) => (
  <div className="mb-7 space-y-3">
    <div className="flex items-center gap-3">
      <FileStack className="h-6 w-6 text-black" />
      <h1 className="text-2xl font-bold text-black">Create form</h1>
    </div>
    <div className="flex items-center gap-2 px-3 py-1 pr-4 w-max rounded-xl bg-green-200 text-black">
      <div className="w-2 h-2 bg-green-600 rounded-full" />
      <p className="text-xs font-medium text-gray-700">{workspaceName}</p>
    </div>
  </div>
);

const FormInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  optional = false
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  optional?: boolean;
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {optional && <span className="text-gray-400 ml-1">(optional)</span>}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 border rounded-lg border-gray-300 focus:border-gray-400 
               focus:ring-2 focus:ring-gray-200 placeholder-gray-400 text-sm transition-all"
      placeholder={placeholder}
    />
  </div>
);

const ThemeButton = ({
  theme,
  currentTheme,
  children,
  onClick
}: {
  theme: string;
  currentTheme: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-3 border-2 rounded-xl transition-all flex items-center justify-center
      ${theme === currentTheme 
        ? 'border-gray-900 bg-gray-50 font-semibold' 
        : 'border-gray-200 hover:border-gray-300 font-medium'}`}
  >
    <span className="text-sm">{children}</span>
  </button>
);

const ActionButton = ({
  children,
  onClick,
  variant = "secondary",
  disabled = false,
  type = "button"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit";
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors
      ${variant === 'primary' 
        ? 'text-white bg-black hover:bg-black/85 disabled:opacity-50' 
        : 'text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
  >
    {children}
  </button>
);

const WorkspaceCreateFormModal = ({
  wsId,
  workspaceName,
  isCreateFormModal,
  setCreateFormModal,
}: ModalProps) => {
  const { data: session } = useSession();
  const [formDetails, setFormDetails] = useState<CreateFormInterface>({
    title: "",
    description: "",
    theme: "ROUNDED",
  });
  const [isValid, setIsValid] = useState<boolean>(false); 
  const [errorMsg, setErrorMsg] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsValid(formDetails.title.trim().length > 0);
  }, [formDetails.title]);

  const createFormMutation = useMutation({
    mutationFn: () => axios.post(
      `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/forms`,
      formDetails,
      { headers: { Authorization: `Bearer ${session?.accessToken}` } }
    ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspace"] });
      onClose();
    },
    onError: (error) => setErrorMsg(handleAxiosError(error)),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails(prev => ({ ...prev, [name]: value }));
  };

  const onClose = () => setCreateFormModal(prev => !prev);

  if (!isCreateFormModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] max-w-xl bg-white rounded-xl border p-6 border-gray-200 shadow-xl">
        <FormHeader workspaceName={workspaceName} />

        <form onSubmit={(e) => { e.preventDefault(); createFormMutation.mutate(); }}>
          <div className="space-y-6">
            <FormInput
              label="Form Title"
              name="title"
              value={formDetails.title}
              placeholder="Enter form title"
              onChange={handleInputChange}
            />

            <FormInput
              label="Description"
              name="description"
              value={formDetails.description}
              placeholder="Add a description..."
              onChange={handleInputChange}
              optional
            />

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900">Interface Theme</p>
                <p className="text-xs text-gray-500">Can be changed later</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <ThemeButton
                  theme="ROUNDED"
                  currentTheme={formDetails.theme}
                  onClick={() => setFormDetails(p => ({ ...p, theme: "ROUNDED" }))}
                >
                  Rounded
                </ThemeButton>
                <ThemeButton
                  theme="BOXY"
                  currentTheme={formDetails.theme}
                  onClick={() => setFormDetails(p => ({ ...p, theme: "BOXY" }))}
                >
                  Boxy
                </ThemeButton>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                {errorMsg}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <ActionButton onClick={onClose} variant="secondary">
                Cancel
              </ActionButton>
              <ActionButton 
                type="submit" 
                variant="primary"
                disabled={!isValid || createFormMutation.isPending}
              >
                {createFormMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Form"
                )}
              </ActionButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceCreateFormModal;