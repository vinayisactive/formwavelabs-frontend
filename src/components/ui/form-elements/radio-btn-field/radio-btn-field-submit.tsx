"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { RadioButtonCustomInstance } from "./radio-btn-prop-attributes";
import { SplitSubmitComponentWrapper } from "../property-reusable-comp";

const RadioBtnSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
  theme,
}) => {
  const { id, extraAttributes } = elementInstance as RadioButtonCustomInstance;
  const { label, helperText, options, required } = extraAttributes;
  const [inputValue, setInputValue] = useState<string>(
    formValues?.current?.[id] || ""
  );

  const handleChange = (value: string) => {
    setInputValue(value);

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: value.trim() === "" ? "" : undefined,
      }));
    }

    if (handleValues) {
      handleValues(id, value);
    }
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
      <div className="flex flex-col gap-3 mt-2">
        {options.map((option) => (
          <label
            key={option}
            htmlFor={`${id}-${option}`}
            className="cursor-pointer"
          >
            <input
              type="radio"
              id={`${id}-${option}`}
              name={id}
              value={option}
              checked={
                formValues?.current?.[id] === option || inputValue === option
              }
              onChange={(e) => handleChange(e.target.value)}
              className="peer hidden"
            />
            <div
              className={`px-3 py-2 text-sm overflow-hidden text-gray-700 flex items-center justify-start shrink-0 whitespace-nowrap ${
                theme === "BOXY"
                  ? "border border-black/50 peer-checked:border-black peer-checked:border-r-4 peer-checked:border-b-4 peer-checked:text-black"
                  : "border-2 rounded-md border-gray-300 peer-checked:border-2 peer-checked:border-black peer-checked:shadow-md peer-checked:shadow-black/40 peer-checked:text-black"
              }`}
            >
              {option}
            </div>
          </label>
        ))}
      </div>
    </SplitSubmitComponentWrapper>
  );
};

export default RadioBtnSubmit;
