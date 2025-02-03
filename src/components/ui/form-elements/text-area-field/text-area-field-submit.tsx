"use client";

import React, { useState } from "react";
import { TextAreaCustomInstance } from "./text-area-prop-attributes";
import { FormElemetInstance, submitValueType } from "@/utility/ts-types";

type TextFieldSubmitProps = {
  elementInstance: FormElemetInstance;
  handleValues?: submitValueType | undefined; 
  formValues?: React.RefObject<{ [key: string]: string }>;
};

const TextAreaFieldSubmitComp: React.FC<TextFieldSubmitProps> = ({
  elementInstance,
  handleValues,
  formValues
}) => {
  const { id, extraAttributes } = elementInstance as TextAreaCustomInstance;
  const { label, helperText, placeholder, required } = extraAttributes;

  const [inputValue, setInputValue] = useState<string>(formValues?.current[id] || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (handleValues) {
      handleValues(id, newValue);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
       {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        id={id}
        placeholder={placeholder}
        required={required}
        value={formValues?.current[id] || inputValue}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      />

      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

export default TextAreaFieldSubmitComp;
