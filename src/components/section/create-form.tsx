"use client";

import { handleAxiosError } from '@/utility/axios-err';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface CreateFormInterface {
  title: string;
  description: string;
}

const CreateForm = () => {
  const [formDetails, setFormDetails] = useState<CreateFormInterface>({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
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
        'https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms',
        formDetails,
        { withCredentials: true }
      );

      setLoading(false);

      if (response.data.status === 'success') {
        router.push(`/form/${response.data.data.id}`);
      }

    } catch (error) {
      setErrorMsg(handleAxiosError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={submitHandler}
        className="w-96 p-6 bg-white shadow-md rounded-lg flex flex-col gap-4 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-700">Create a New Form</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gray-600 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formDetails.title}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the form title"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-gray-600 font-medium">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formDetails.description}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the form description"
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-white font-medium rounded-md transition-all ${
            isValid
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <Loader className="animate-spin" size={16} />
          ) : (
            'Create Form'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateForm;