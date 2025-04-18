"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { handleAxiosError } from "@/utility/axios-err-handler";
import { Mail, ChevronDown, UserCircle, Loader, Send } from "lucide-react";
import { useSession } from "next-auth/react";

const WorkSpaceInviteModal = ({
  wsId,
  workspaceName,
  isInviteModalOpen,
  setInviteModal,
}: {
  wsId: string;
  workspaceName?: string;
  isInviteModalOpen: boolean;
  setInviteModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const accessToken = useSession().data?.accessToken;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ADMIN" | "EDITOR" | "VIEWER">("VIEWER");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsValid(emailRegex.test(email) && !!role);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, role]);

  const onClose = () => setInviteModal(false);

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
    } catch (err) {
      setMessage(handleAxiosError(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInviteModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] max-w-xl bg-white rounded-xl border border-gray-200 shadow-xl p-6 space-y-6">

        <div className="mb-6 space-y-1">
          <h2 className="text-2xl font-bold text-black">Invite member</h2>
          <div className="flex items-center gap-2 px-3 py-1 pr-4 w-max rounded-xl bg-green-200 text-black">
            <div className="w-2 h-2 bg-green-600 rounded-full" />
            <p className="text-xs font-medium text-gray-700">{workspaceName}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "ADMIN" | "EDITOR" | "VIEWER")
                }
                className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm cursor-pointer focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none appearance-none transition-all"
              >
                <option value="VIEWER">Viewer</option>
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Feedback Message */}
          {message && (
            <div
              className={`p-3 text-sm rounded-lg ${
                message.includes("success")
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "bg-red-50 text-red-700 border border-red-100"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={!isValid || isLoading}
            className="px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 bg-black text-white rounded-lg hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default WorkSpaceInviteModal;
