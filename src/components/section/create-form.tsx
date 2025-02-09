"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { handleAxiosError } from "@/utility/axios-err-handler";
import axios from "axios";

import {
  Loader,
  PenSquare,
  TextCursorInput,
  TextQuote,
  AlertTriangle,
  LayoutGrid,
} from "lucide-react";

interface CreateFormInterface {
  title: string;
  description: string;
  theme: "ROUNDED" | "BOXY";
}

const CreateForm = () => {
  const session = useSession();
  const token = session.data?.accessToken;

  const [formDetails, setFormDetails] = useState<CreateFormInterface>({
    title: "",
    description: "",
    theme: "ROUNDED",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setIsValid(formDetails.title.trim().length > 0);
  }, [formDetails.title]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms",
        formDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (response.data.status === "success") {
        router.push(`/form/${response.data.data.id}/1/builder`);
      }
    } catch (error) {
      setErrorMsg(handleAxiosError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50/20 to-purple-50/20 p-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md space-y-6 bg-white rounded-2xl shadow-xl p-8 border border-gray-100/80 backdrop-blur-sm"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mt-2">Create New Form</h2>
          <p className="text-gray-500">Start collecting data with a beautiful new form</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <TextCursorInput className="w-5 h-5 text-blue-600" />
              Form Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formDetails.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Trip member details"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <TextQuote className="w-5 h-5 text-purple-600" />
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formDetails.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder="Optional description for your form"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="theme" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <LayoutGrid className="w-5 h-5 text-green-600" />
              Form Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={formDetails.theme}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="ROUNDED">Rounded</option>
              <option value="BOXY">Boxy</option>
            </select>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-3 p-3 bg-red-50/80 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-600 text-sm">{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-3 flex items-center justify-center gap-2 rounded-lg font-medium transition-all ${
              isValid && !loading
                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-100"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <PenSquare className="w-5 h-5" />
                <span>Create Form</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
