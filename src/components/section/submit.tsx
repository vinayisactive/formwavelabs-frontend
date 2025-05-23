"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { handleAxiosError } from "@/utility/axios-err-handler";
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
  theme: "BOXY" | "ROUNDED";
}

const Submit = ({ formId }: { formId: string }) => {
  const [formData, setForm] = useState<FormDataInterface | null>(null);
  const [elementsToValidate, setElementsToValidate] = useState<
    Record<string, string | undefined>
  >({});
  const [count, setCount] = useState<number>(0);
  const [pageLength, setPageLength] = useState<number>(0);
  const [currentPageData, setCurrentPageData] = useState<FormElemetInstance[]>(
    []
  );

  const [formValues, setFormValues] = useState<{ [key: string]: { id: string, value: string, label: string} }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isFormError, setIsFormError] = useState<boolean>(false);

  const handleValues = (key: string, value: { id: string, value: string, label: string}) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const formAnalyticData = async() => {
      try {
        await axios.post(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/track`)
      } catch (error) {
        console.error(handleAxiosError(error))
      }
    }

    formAnalyticData(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleSubmit = async () => {
    try {
      if (!isFormValid()) {
        setIsFormError(true);
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/responses`,
        {
          content: JSON.stringify(formValues),
        }
      );

      if (response.data.status === "success") {
        setIsSubmitted(true);
      }

      setLoading(false);
    } catch (error) {
      setErrMsg(handleAxiosError(error));
      setLoading(false);
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}`
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

  useEffect(() => {
    if (formData) {
      const flattenArray: FormElemetInstance[] = [];

      formData.pages.forEach((page) => {
        if (typeof page.content === "string") {
          try {
            const convertedContent = JSON.parse(
              page.content
            ) as FormElemetInstance[];
            flattenArray.push(...convertedContent);
          } catch (error) {
            console.error("Error parsing page content:", error);
          }
        }
      });

      const validationState = flattenArray
        .filter((element) => element.extraAttributes?.required)
        .reduce((acc, element) => {
          acc[element.id] = "";
          return acc;
        }, {} as Record<string, string>);

      setElementsToValidate(validationState);
    }
  }, [formData]);

  const isFormValid = () => {
    return !Object.values(elementsToValidate).some((value) => value === "");
  };

  useEffect(() => {
    setIsFormError(false);
  }, [elementsToValidate]);

  if(!formData){
    return(
      <div className="w-screen h-screen flex justify-center items-center">
        Either form is not published or does not exists.
      </div>
    )
  }

  return (
    <div className="w-full h-auto flex justify-center px-2">
      <div className="w-full max-w-3xl px-3 md:px-5 md:py-4 py-3 flex flex-col justify-center gap-5 mt-10 mb-20 md:border rounded-md">
        <div className="flex gap-2 pl-2">
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

        <div
          className={`space-y-7 px-3 py-6 bg-white shadow-lg ${
            formData?.theme === "BOXY"
              ? "border-r-4 border-b-4 border-black border"
              : "border rounded-lg"
          }`}
        >
          {currentPageData.map((el) => {
            const SubmitComponent = FormElemets[el.type].submit;
            return (
              <SubmitComponent
                formId={formId}
                elementInstance={el}
                key={el.id}
                handleValues={handleValues}
                formValues={formValues}
                setFormValues={setFormValues}
                elementsToValidate={elementsToValidate}
                setElementsToValidate={setElementsToValidate}
                isFormError={isFormError}
                theme={formData?.theme}
              />
            );
          })}
        </div>

        <div className="flex gap-4 justify-end pr-1 w-full">
          {count > 0 && (
            <button
              onClick={() => setCount((prev) => (prev === 0 ? 0 : prev - 1))}
              className={`px-4 py-2 border border-black ${
                formData?.theme === "BOXY"
                  ? "border-r-4 border-b-4"
                  : "rounded-md"
              } hover:bg-black hover:text-white transition`}
            >
              Previous
            </button>
          )}

          {count !== pageLength - 1 && (
            <button
              onClick={() =>
                setCount((prev) => (prev === pageLength - 1 ? prev : prev + 1))
              }
              className={`px-4 py-2 border border-black ${
                formData?.theme === "BOXY"
                  ? "border-r-4 border-b-4"
                  : "rounded-md"
              } hover:bg-black hover:text-white transition`}
            >
              Next
            </button>
          )}

          {count === pageLength - 1 && (
            <button
              className={`px-4 py-2 border border-black ${
                formData?.theme === "BOXY"
                  ? "border-r-4 border-b-4"
                  : "rounded-md"
              } hover:bg-black ${
                loading && "opacity-50"
              } hover:text-white transition ${
                isFormError ? "bg-red-500 hover:bg-red-500 text-white" : ""
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {isFormError
                ? "Fill required fields"
                : loading
                ? "Saving..."
                : "Submit"}
            </button>
          )}
        </div>

        {errMsg && <p>{errMsg}</p>}
        {isSubmitted && (
          <p className="text-green-400">Form is submitted successfully</p>
        )}
      </div>
    </div>
  );
};

export default Submit;