"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import CopyToClipboard from "./copy-to-clipboard";
import { ArrowUpRight, MoreVertical, Loader2, Trash2 } from "lucide-react";
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
  visits: number;
}

interface StatusIndicatorProps {
  label: string;
  dotColor: string;
  textColor: string;
  bgColor: string;
}

interface FormActionsMenuProps {
  formId: string;
  userRole: string | null;
}

interface MenuItemLinkProps {
  href: string;
  label: string;
  onClose: () => void;
}

interface StatsBadgeProps {
  label: string;
  value: number;
}

const FormCard: FC<FormCardProps> = ({
  visits,
  formId,
  title,
  status,
  submissions,
  userRole,
}) => {
  return (
    <div className="relative w-full border flex flex-col justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StatusIndicator
            label={status ? "Live" : "Draft"}
            dotColor={status ? "bg-green-500" : "bg-gray-500"}
            textColor={status ? "text-green-600" : "text-gray-600"}
            bgColor={status ? "bg-green-100" : "bg-gray-100"}
          />
          {status && (
            <CopyToClipboard
              textToCopy={`${window.location.origin}/forms/${formId}`}
              className="p-1.5 hover:bg-gray-100 rounded-2xl transition-colors"
            />
          )}
        </div>

        <FormActionsMenu formId={formId} userRole={userRole} />
      </div>

      <div className="space-y-4">
        <h3 className="text-gray-900 text-lg font-semibold truncate pr-8 leading-tight">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <StatsBadge label="Visits" value={visits} />
          <StatsBadge label="Submissions" value={submissions} />
        </div>
      </div>
    </div>
  );
};

const StatusIndicator: FC<StatusIndicatorProps> = ({
  label,
  dotColor,
  textColor,
  bgColor,
}) => (
  <span
    role="status"
    aria-label={label}
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-colors ${textColor} ${bgColor}`}
  >
    <span className={`h-2 w-2 rounded-full ${dotColor}`} aria-hidden="true" />
    {label}
  </span>
);

const FormActionsMenu: FC<FormActionsMenuProps> = ({ formId, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const session = useSession().data;
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleCloseMenus = (e: CustomEvent) => {
      if (e.detail.formId !== formId) setIsMenuOpen(false);
    };

    window.addEventListener("close-form-menus", handleCloseMenus as EventListener);
    return () => window.removeEventListener("close-form-menus", handleCloseMenus as EventListener);
  }, [formId]);

  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (newState) {
      window.dispatchEvent(new CustomEvent("close-form-menus", { detail: { formId } }));
    }
  };

  const deleteFormMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workspace"] }),
    onError: (error) => console.error(handleAxiosError(error)),
  });

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleMenuToggle}
        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-150"
        aria-label="Form actions"
      >
        <MoreVertical size={20} className="text-gray-600" />
      </button>

      {isMenuOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-gray-100 backdrop-blur-sm transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] z-50"
          onMouseEnter={() => timeoutRef.current && clearTimeout(timeoutRef.current)}
          onMouseLeave={() => timeoutRef.current = setTimeout(() => setIsMenuOpen(false), 2000)}
        >
          <div className="p-1.5 space-y-0.5">
            {userRole !== "VIEWER" && <MenuItemLink href={`/forms/${formId}/builder`} label="Edit Form" onClose={() => setIsMenuOpen(false)} />}
            <MenuItemLink href={`/forms/${formId}/submission`} label="Submissions" onClose={() => setIsMenuOpen(false)} />
            <MenuItemLink href={`/forms/${formId}/analytics`} label="Analytics" onClose={() => setIsMenuOpen(false)} />
          </div>

          <div className="border-t border-gray-100 p-1.5">
          <p className="pb-2 text-[11px] font-medium text-gray-500 leading-tight">
              Permanent deletion
            </p>

            <button
              role="menuitem"
              aria-disabled={deleteFormMutation.isPending}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white bg-black/80 rounded-md hover:bg-black transition-colors"
              onClick={() => deleteFormMutation.mutate()}
            >
              <span className="flex items-center gap-2">
                <Trash2 size={16} className="opacity-70" />
                Delete 
              </span>
              {deleteFormMutation.isPending && <Loader2 size={15} className="animate-spin opacity-70" />}
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

const MenuItemLink: FC<MenuItemLinkProps> = ({ href, label, onClose }) => (
  <Link
    role="menuitem"
    href={href}
    className="group flex justify-between items-center px-3 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
    onClick={onClose}
  >
    <span>{label}</span>
    <ArrowUpRight size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
  </Link>
);

const StatsBadge: FC<StatsBadgeProps> = ({ label, value }) => (
  <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
    <span className="text-xs font-medium text-gray-500">{label}</span>
    <span className="text-base font-medium text-gray-900">
      {value.toLocaleString()}
    </span>
  </div>
);

export default FormCard; 