"use client";

import React, { useState } from "react";
import { TextCustomInstance } from "./text-prop-attributes";
import { submitCompPropsType } from "@/utility/ts-types";
import { SubmitComponentWrapper } from "../property-reusable-comp";

const TextFieldSubmit: React.FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError
}) => {
  const { id, extraAttributes } = elementInstance as TextCustomInstance;
  const { label, helperText, placeholder, required } = extraAttributes;

  const [inputValue, setInputValue] = useState<string>(
    formValues?.current[id] || ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: newValue.trim() === "" ? "" : undefined
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
      required={required}
      helperText={helperText}
      currentElementToValidate={elementsToValidate?.[id]}
      isFormError={isFormError}
    >
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        required={required}
        value={formValues?.current[id] || inputValue}
        onChange={handleChange}
        className="w-full pb-1 border-b-2 border-gray-300 focus:outline-none text-sm mt-1"
      />
    </SubmitComponentWrapper>
  );
};

export default TextFieldSubmit;
