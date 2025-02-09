"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { MultipleChoiceFieldCustomInstance } from "./multiple-choice-prop-attributes";
import {
  SubmitComponentWrapper,
} from "../property-reusable-comp";

const MultipleChoiceFieldSubmitComp: FC<submitCompPropsType> = ({
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
    const storedValue = formValues?.current?.[id];
    return typeof storedValue === "string" ? storedValue.split(", ") : [];
  });

  const selectOptionHandler = (option: string) => {
    setSelectedOptions((prev) => {
      const newOptions = prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option];

      if (handleValues) {
        handleValues(id, newOptions.join(", "));
      }
      return newOptions;
    });

    if (required) {
      const isExists =
        formValues?.current?.[id] && formValues.current?.[id].split(", ");
      const isValid = isExists && isExists?.length > 0;
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: isValid ? undefined : "",
      }));
    }
  };

  return (
    <SubmitComponentWrapper
      id={id}
      label={label}
      helperText={helperText}
      required={required}
      currentElementToValidate={elementsToValidate?.[id]}
      isFormError={isFormError}
    >
      <div className="space-y-2 mt-2">
        {options?.map((option) => (
          <div
            key={option}
            onClick={() => selectOptionHandler(option)}
            className={`cursor-pointer p-2 border bg-white transition-all 
              ${theme === "BOXY"
                ? selectedOptions.includes(option)
                  ? "border-black border-r-4 border-b-4"
                  : "border border-black"
                : selectedOptions.includes(option)
                  ? "rounded-md border-black border-2 shadow-md shadow-black/50"
                  : "border-2 border-gray-300 rounded-md"
              }`}
          
          >
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
                 className="h-4 w-4 text-black accent-black focus:ring-black checked:rounded-none"
              />
              <span className="text-sm text-gray-700 w-full" onClick={() => selectOptionHandler(option)}>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </SubmitComponentWrapper>
  );
};

export default MultipleChoiceFieldSubmitComp;
