"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import CopyToClipboard from "./copy-to-clipboard";
import { ArrowUpRight, Pencil, MoreVertical, Loader2, Trash2, BarChart2 } from "lucide-react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { handleAxiosError } from "@/utility/axios-err-handler";

interface FormCardProps {
  formId: string;
  title: string;
  status: boolean;
  submissions: number;
  userRole: string | null;
}

const FormCard: FC<FormCardProps> = ({
  formId,
  title,
  status,
  submissions,
  userRole,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const session = useSession().data;

  useEffect(() => {
    const handleCloseMenus = (e: CustomEvent) => {
      if (e.detail.formId !== formId) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "close-form-menus",
      handleCloseMenus as EventListener
    );
    return () =>
      window.removeEventListener(
        "close-form-menus",
        handleCloseMenus as EventListener
      );
  }, [formId]);

  const queryClient = useQueryClient();

  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (newState) {
      window.dispatchEvent(
        new CustomEvent("close-form-menus", { detail: { formId } })
      );
    }
  };

  const handleMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 2000);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const deleteFormMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workspace"] }),
    onError: (error) => console.error(handleAxiosError(error)),
  });

  return (
    <div className="w-full h-[150px] md:h-[100px] max-h-[150px] md:max-h-[100px] flex flex-col justify-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3 md:mb-0">
        <h3 className="font-medium text-gray-800 text-sm md:text-2xl truncate max-w-[70%]">
          {title}
        </h3>
        
        {/* Mobile Menu */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={handleMenuToggle}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical size={20} className="text-gray-600" />
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-black z-10"
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              <div className="p-2 space-y-1">
                {userRole !== "VIEWER" && userRole !== null && (
                  <Link
                    href={`/forms/${formId}/builder`}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Pencil size={16} />
                    Edit Form
                  </Link>
                )}

                <Link
                  href={`/forms/${formId}/submission`}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ArrowUpRight size={16} />
                  Submissions
                </Link>

                <button
                  className="w-full px-4 py-2 text-gray-700 flex justify-center items-center gap-2  bg-red-400 hover:bg-red-500 rounded-md transition-colors whitespace-nowrap"
                  onClick={() => deleteFormMutation.mutate()}
                >
                  Delete{" "}
                  {deleteFormMutation.isPending && (
                    <Loader2 size={15} className="animate-spin" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Status */}
          {status ? (
            <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
              <span>Published</span>
              <CopyToClipboard
                textToCopy={`http://localhost:3000/submit/${formId}`}
                className="p-1 hover:bg-green-50 rounded-md"
              />
            </div>
          ) : (
            <span className="text-gray-500 font-medium text-sm">Draft</span>
          )}

          {/* Submissions */}
          <div className="flex items-center gap-1 text-gray-800 font-medium text-sm">
            <BarChart2 size={16} className="text-gray-600" />
            <span>{submissions}</span>
          </div>

          {/* Edit Button */}
          {userRole !== "VIEWER" && userRole !== null && (
            <Link
              href={`/forms/${formId}/builder`}
              className="flex items-center gap-1 p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-700"
            >
              <Pencil size={16} />
              <span className="hidden lg:inline">Edit</span>
            </Link>
          )}

          {/* Delete Button */}
          <button
            onClick={() => deleteFormMutation.mutate()}
            className="flex items-center gap-1 p-1.5 hover:bg-red-100 rounded-md transition-colors text-red-600"
            disabled={deleteFormMutation.isPending}
          >
            {deleteFormMutation.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            <span className="hidden lg:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* Mobile Status & Submissions */}
      <div className="md:hidden flex-1 flex flex-col justify-center gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Status</span>
          <div className="flex items-center gap-2">
            {status ? (
              <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
                <span className="sm:inline">Published</span>
                <CopyToClipboard
                  textToCopy={`http://localhost:3000/submit/${formId}`}
                  className="p-1.5 hover:bg-green-50 rounded-md"
                />
              </div>
            ) : (
              <span className="text-gray-500 font-medium text-sm">Draft</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Submissions</span>
          <span className="text-gray-800 font-medium text-sm">
            {submissions}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormCard;