"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { selectFieldCustomInstance } from "./select-prop-attributes";
import { SubmitComponentWrapper } from "../elements-reusable-comp";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const SelectSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
  theme,
}) => {
  const { id, extraAttributes } = elementInstance as selectFieldCustomInstance;
  const { label, helperText, options, required, selectPlaceHolder } =
    extraAttributes;

  const [inputValue, setInputValue] = useState<string>(
    formValues?.[id]?.value || ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: value.trim() === "" ? "" : undefined,
      }));
    }

    handleValues?.(id, { id, value, label: extraAttributes.label });
  };

  const clearSelection = () => {
    setInputValue("");
    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
    handleValues?.(id, { id, value: "", label: extraAttributes.label });
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
      <div className="relative w-full mt-2">
        <select
          id={id}
          required={required}
          value={inputValue}
          onChange={handleChange}
          className={`w-full px-3  ${
            theme === "BOXY"
              ? "border-r-4 border-b-4 border border-black py-2"
              : "border-2 border-gray-300 py-2 rounded-md focus:border-2"
          }  text-sm cursor-pointer`}
        >
          <option value="" disabled className="py-2 px-3 text-gray-500">
            {selectPlaceHolder}
          </option>
          {options &&
            options.map((option) => (
              <option
                value={option}
                key={option}
                className="py-2 px-3 text-gray-700"
              >
                {option}
              </option>
            ))}
        </select>

        {inputValue && (
          <button
            type="button"
            onClick={clearSelection}
            className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <X size={15} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col">
          <ChevronUp className=" text-gray-400 mb-[1px]" size={12} />
          <ChevronDown className=" text-gray-400" size={12} />
        </div>
      </div>
    </SubmitComponentWrapper>
  );
};

export default SelectSubmit;
