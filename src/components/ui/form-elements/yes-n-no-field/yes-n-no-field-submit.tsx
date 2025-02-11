"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { YesAndNoFieldCustomInstance } from "./yes-n-no-prop-attributes";
import { SubmitComponentWrapper } from "../property-reusable-comp";

const YesAndNoFieldSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
}) => {
  const { id, extraAttributes } =
    elementInstance as YesAndNoFieldCustomInstance;
  const { label, helperText, options, required } = extraAttributes;
  const [inputValue, setInputValue] = useState<string>(
    formValues?.current?.[id] || ""
  );

  const handleChange = (value: string) => {
    setInputValue(value);

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: value,
      }));
    }

    if (handleValues) {
      handleValues(id, value);
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
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <input
              type="radio"
              id={`${id}-${option}`}
              name={id}
              value={option}
              checked={
                formValues?.current?.[id] === option || inputValue === option
              }
              onChange={(e) => handleChange(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor={`${id}-${option}`}
              className="text-sm text-gray-700 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </SubmitComponentWrapper>
  );
};

export default YesAndNoFieldSubmit;
