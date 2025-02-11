"use client";

import React, { useState } from "react";
import { TextAreaCustomInstance } from "./text-area-prop-attributes";
import { submitCompPropsType } from "@/utility/ts-types";
import { SubmitComponentWrapper } from "../property-reusable-comp";

const TextAreaSubmit: React.FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
  theme
}) => {
  const { id, extraAttributes } = elementInstance as TextAreaCustomInstance;
  const { label, helperText, placeholder, required } = extraAttributes;

  const [inputValue, setInputValue] = useState<string>(
    formValues?.current[id] || ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: newValue.trim() === "" ? "" : undefined,
      }));
    }

    setInputValue(newValue);
    if (handleValues) {
      handleValues(id, newValue);
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
      <textarea
        id={id}
        placeholder={placeholder}
        required={required}
        value={formValues?.current[id] || inputValue}
        onChange={handleChange}
        className={`w-full px-3 py-2 border-2 border-gray-300 ${theme === "BOXY" ? "" : "rounded-md"} focus:outline-none focus:ring-2 focus:ring-black focus:border-black-500 text-sm`}
      />
    </SubmitComponentWrapper>
  );
};

export default TextAreaSubmit;
