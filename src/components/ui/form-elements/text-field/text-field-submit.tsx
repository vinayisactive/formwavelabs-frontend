"use client";

import React, { useState } from "react";
import { TextCustomInstance } from "./text-prop-attributes";
import { FormElemetInstance, submitValueType } from "@/utility/ts-types";

type TextFieldSubmitProps = {
  elementInstance: FormElemetInstance;
  handleValues?: submitValueType;
};

const TextFieldSubmitComp: React.FC<TextFieldSubmitProps> = ({
  elementInstance,
  handleValues,
}) => {
  const { id, extraAttributes } = elementInstance as TextCustomInstance;
  const { label, helperText, placeholder, required } = extraAttributes;

  const [inputValue, setInputValue] = useState<string>("");

  const handleBlur = () => {
    if (inputValue && handleValues) {
      handleValues(id, inputValue);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
       {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type="text"
        id={id}
        placeholder={placeholder}
        required={required}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      />

      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

export default TextFieldSubmitComp;
