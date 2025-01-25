"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { handleAxiosError } from "@/utility/axios-err";
import { FormElemets } from "@/utility/static-data";
import { FormElemetInstance } from "@/utility/ts-types";

interface PagesInterface {
  id: string;
  content: string;
  page: number;
}

interface FormDataInterface {
  title: string;
  description: string;
  pages: PagesInterface[];
  id: string;
}

const Submission = ({ formId }: { formId: string }) => {
//   console.log(`Form ID inside Submission component: ${formId}`);

  const [formData, setForm] = useState<FormDataInterface | null>(null);
  const [count, setCount] = useState<number>(0);
  const [pageLength, setPageLength] = useState<number>(0);
  const [currentPageData, setCurrentPageData] = useState<FormElemetInstance[]>(
    []
  );

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}`,
          {
            withCredentials: true,
          }
        );

        setForm(response.data.data);
        setPageLength(response.data.data.pages?.length);
      } catch (error) {
        console.log(handleAxiosError(error));
      }
    };
    fetchForm();
  }, [formId]);

  useEffect(() => {
    if (formData && typeof formData.pages[count]?.content === "string") {
      const data = JSON.parse(
        formData.pages[count]?.content
      ) as FormElemetInstance[];
      setCurrentPageData(data);
    } else {
      setCurrentPageData([]);
    }
  }, [count, formData]);

  return (
    <div className="w-full h-full flex flex-col items-center bg-white text-black py-8 px-4">
      <div className="flex gap-2 mb-6">
        {Array(pageLength)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className={`h-2 w-6 rounded-full transition-all duration-300 ${
                index === count ? "bg-black" : "bg-gray-300"
              }`}
            ></div>
          ))}
      </div>

      <div className="w-full max-w-2xl space-y-4">
        {currentPageData.map((el) => {
          const SubmitComponent = FormElemets[el.type].submitComponent;
          return <SubmitComponent elementInstance={el} key={el.id} />;
        })}
      </div>

      <div className="mt-8 flex gap-4">
        {count > 0 && (
          <button
            onClick={() => setCount((prev) => (prev === 0 ? 0 : prev - 1))}
            className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
          >
            Previous
          </button>
        )}

        {count !== pageLength - 1 && (
          <button
            onClick={() =>
              setCount((prev) => (prev === pageLength - 1 ? prev : prev + 1))
            }
            className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
          >
            Next
          </button>
        )}

        {count === pageLength - 1 && (
          <button className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition">
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Submission;
