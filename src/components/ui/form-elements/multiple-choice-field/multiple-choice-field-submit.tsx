"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { MultipleChoiceFieldCustomInstance } from "./multiple-choice-prop-attributes";
import { RequiredFieldError } from "../property-reusable-comp";

const MultipleChoiceFieldSubmitComp: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError
}) => {
  const { id, extraAttributes } = elementInstance as MultipleChoiceFieldCustomInstance;
  const { label, helperText, options, required } = extraAttributes;

  const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
    const storedValue = formValues?.current?.[id];
    return typeof storedValue === 'string' ? storedValue.split(", ") : [];
  });

  const selectOptionHandler = (option: string) => {
    setSelectedOptions((prev) => {
      const newOptions = prev.includes(option)
        ? prev.filter(opt => opt !== option)
        : [...prev, option];
        
      if (handleValues) {
        handleValues(id, newOptions.join(', ')); 
      }
      return newOptions;
    });

    if (required) {
      const isValid = selectedOptions.length > 0;
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: isValid ? undefined : ""
      }));
    }
  };


  return (
    <div className="flex flex-col gap-2 p-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="space-y-2">
        {options?.map((option) => (
          <div
            key={option}
            onClick={() => selectOptionHandler(option)}
            className={`cursor-pointer p-2 rounded border transition-colors
              ${selectedOptions.includes(option)
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50 border-gray-200'
              }`}
          >
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          </div>
        ))}
      </div>

      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
       {elementsToValidate?.[id] === "" && isFormError && <RequiredFieldError/>}
    </div>
  );
};

export default MultipleChoiceFieldSubmitComp;