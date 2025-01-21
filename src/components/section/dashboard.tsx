"use client";

import { handleAxiosError } from "@/utility/axios-err";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Form {
  id: string;
  title: string;
  description?: string;
  status: boolean;
}

const FormCard = ({ form }: { form: Form }) => {
  return (
    <div className="p-4 border rounded shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{form.title}</h2>
        <span
          className={`text-sm px-2 py-1 rounded ${
            form.status ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"
          }`}
        >
          {form.status ? "Published" : "Draft"}
        </span>
      </div>
      {form.description && <p className="text-gray-600 mt-2">{form.description}</p>}
      <div className="mt-4 flex justify-end">
        {form.status ? (
          <button className="text-red-500 hover:underline">Delete Form</button>
        ) : (
          <Link href={`/form/${form.id}`} className="text-blue-500 hover:underline">
            Edit
          </Link>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const getUserForms = async () => {
      try {
        const response = await axios.get<{ data: Form[] }>(
          "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms",
          { withCredentials: true }
        );
        setForms(response.data.data);
      } catch (error) {
        setErrorMsg(handleAxiosError(error));
      } finally {
        setLoading(false);
      }
    };

    getUserForms();
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-col items-center">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader className="animate-spin text-gray-500 w-10 h-10" />
        </div>
      ) : errorMsg ? (
        <div className="text-red-500 text-center">
          <p>Error loading forms:</p>
          <p>{errorMsg}</p>
        </div>
      ) : forms.length > 0 ? (
        <div className="w-full max-w-4xl grid gap-4">
          {forms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No forms found.</p>
      )}
    </div>
  );
};

export default Dashboard;
