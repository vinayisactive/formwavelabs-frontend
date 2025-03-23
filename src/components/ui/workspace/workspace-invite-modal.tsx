"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { handleAxiosError } from "@/utility/axios-err-handler";
import { X, Mail, Loader, ChevronDown, UserCircle, Send } from "lucide-react";
import { useSession } from "next-auth/react";

const WorkSpaceInviteModal = ({
  wsId,
  workspaceName,
  isInviteModalOpen,
  setInviteModalOpen,
}: {
  wsId: string;
  workspaceName: string | undefined;
  isInviteModalOpen: boolean;
  setInviteModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ADMIN" | "EDITOR" | "VIEWER">("VIEWER");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const accessToken = useSession().data?.accessToken;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const isValidEmail = emailRegex.test(email);
    const isValidRole = role !== null;
    setIsValid(isValidEmail && isValidRole);
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, role]);

  const handleInvite = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/invite`,
        { email, role },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (res.data.status) {
        setMessage("Invite sent successfully!");
        setEmail("");
        setRole("VIEWER");
        setTimeout(onClose, 1500);
      }
    } catch (error) {
      setMessage(handleAxiosError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setInviteModalOpen((prev) => !prev);
  };

  if (!isInviteModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-100/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-2xl border border-gray-200 animate-in zoom-in-95 flex flex-col gap-3">
        <div className="flex justify-between items-start mb-4">
          <div className=" space-y-1">
            <h2 className="text-3xl font-semibold text-black">
              Invite <span className="text-sm"> a user to {workspaceName}</span>
            </h2>
            <p className="text-[12px] text-gray-500 mb-4 font-light">
              Enter the email address of an existing user to invite
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-sm hover:bg-gray-100 p-1.5 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 outline-none transition-all"
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={role}
                className="w-full pl-10 pr-8 py-2.5 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 appearance-none outline-none transition-all cursor-pointer"
                onChange={(e) => setRole(e.target.value as typeof role)}
              >
                <option value="VIEWER">Viewer</option>
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {message && (
            <div
              className={`text-sm p-3 rounded-md ${
                message.includes("success")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!isValid || isLoading}
              onClick={handleInvite}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-gray-900"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4 -translate-y-px" />
                  Send Invite
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceInviteModal;
