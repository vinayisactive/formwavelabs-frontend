"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { selectFieldCustomInstance } from "./select-prop-attributes";
import { SubmitComponentWrapper } from "../elements-reusable-comp";

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
    const newValue = e.target.value;

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: newValue.trim() === "" ? "" : undefined,
      }));
    }

    setInputValue(newValue);
    handleValues?.(id, {id, value: newValue, label: extraAttributes.label});
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
      <select
        id={id}
        required={required}
        value={formValues?.[id]?.value || inputValue}
        onChange={handleChange}
        className={`w-full px-3 mt-2  ${
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
    </SubmitComponentWrapper>
  );
};

export default SelectSubmit;
