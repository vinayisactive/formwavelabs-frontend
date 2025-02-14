"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { handleAxiosError } from "@/utility/axios-err-handler";
import axios from "axios";


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
        router.push(`/form/${response.data.data.id}/builder`);
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
    <div className="h-full w-full flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end p-4 lg:p-8">
        <form onSubmit={submitHandler} className="w-full max-w-md space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Form</h1>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Title
              </label>
              <input
                type="text"
                name="title"
                value={formDetails.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter form title"
              />
            </div>
  
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <input
                type="text"
                name="description"
                value={formDetails.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Form description"
              />
            </div>
  
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errorMsg}</p>
              </div>
            )}
  
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full py-3 mt-6 text-white font-medium rounded-lg transition-colors ${
                isValid && !loading ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Creating..." : "Create Form"}
            </button>
          </div>
        </form>
      </div>
  
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center md:justify-start p-4 lg:p-8">
        <div className="w-full max-w-md broder">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Select Theme</h2>
          <div className="flex flex-row gap-4">
            <button
              type="button"
              onClick={() => setFormDetails(prev => ({ ...prev, theme: "ROUNDED" }))}
              className={`flex-1 p-6 border-2 ${
                formDetails.theme === "ROUNDED" ? "border-black" : "border-gray-200"
              } bg-white rounded-xl transition-all`}
            >
              <div className="space-y-2">
                <div className="h-24 bg-gray-100 rounded-xl mb-3" />
                <span className="text-sm font-medium">Rounded</span>
                <p className="text-xs text-gray-500">Soft rounded corners</p>
              </div>
            </button>
  
            <button
              type="button"
              onClick={() => setFormDetails(prev => ({ ...prev, theme: "BOXY" }))}
              className={`flex-1 p-6 border-2 ${
                formDetails.theme === "BOXY" ? "border-black" : "border-gray-200"
              } bg-white rounded-xl transition-all`}
            >
              <div className="space-y-2">
                <div className="h-24 bg-gray-100 rounded-none mb-3" />
                <span className="text-sm font-medium">Boxy</span>
                <p className="text-xs text-gray-500">Sharp rectangular edges</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
