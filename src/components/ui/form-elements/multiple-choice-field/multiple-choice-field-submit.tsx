"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { MultipleChoiceFieldCustomInstance } from "./multiple-choice-prop-attributes";
import {
  SplitSubmitComponentWrapper,
} from "../elements-reusable-comp";

const MultipleChoiceSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
  theme,
}) => {
  const { id, extraAttributes } = 
    elementInstance as MultipleChoiceFieldCustomInstance;
  const { label, helperText, options, required } = extraAttributes;

  const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
    const storedValue = formValues?.[id];
    return typeof storedValue === "string" && storedValue !== "" 
      ? storedValue.split(",") 
      : [];
  });

  const handleChange = (option: string) => {
    setSelectedOptions((prev) => {
      const cleanPrev = prev.filter(Boolean);
      const newOptions = cleanPrev.includes(option)
        ? cleanPrev.filter((opt) => opt !== option)
        : [...cleanPrev, option];

      handleValues?.(id, newOptions.join(","));

      if (required) {
        const isValid = newOptions.length > 0;
        setElementsToValidate?.((prev) => ({
          ...prev,
          [id]: isValid ? undefined : "",
        }));
      }

      return newOptions;
    });
  };

  return (
    <SplitSubmitComponentWrapper
      id={id}
      label={label}
      helperText={helperText}
      required={required}
      currentElementToValidate={elementsToValidate?.[id]}
      isFormError={isFormError}
    >
      <div className="space-y-3 mt-2">
        {options?.map((option) => (
          <div
            key={option}
            onClick={() => handleChange(option)}
            className={`cursor-pointer p-2 border bg-white transition-all 
              ${theme === "BOXY"
                ? selectedOptions.includes(option)
                  ? "border-black border-r-4 border-b-4"
                  : "border border-black"
                : selectedOptions.includes(option)
                  ? "rounded-md border-black border-2 shadow-md shadow-black/30"
                  : "border-2 border-gray-300 rounded-md"
              }`}
          >
            <label className="flex items-center space-x-3 cursor-pointer overflow-hidden">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
                className="h-4 w-4 text-black accent-black focus:ring-black checked:rounded-none"
              />
              {/* Removed redundant onClick from span */}
              <span className="text-sm text-gray-700 w-full">{option}</span>
            </label>
          </div>
        ))}
      </div>
    </SplitSubmitComponentWrapper>
  );
};

export default MultipleChoiceSubmit;
