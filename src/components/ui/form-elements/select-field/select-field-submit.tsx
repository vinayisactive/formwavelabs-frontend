"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { selectFieldCustomInstance } from "./select-prop-attributes";
import { RequiredFieldError } from "../property-reusable-comp";


const SelectFieldSubmitComp: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError
}) => {
  const { id, extraAttributes } = elementInstance as selectFieldCustomInstance;
  const { label, helperText, options, required, selectPlaceHolder } = extraAttributes;

  const [inputValue, setInputValue] = useState<string>(formValues?.current[id] || "");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    if(required){
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: newValue.trim() === "" ? "" : undefined
      }))
    }

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

      <select
        id={id}
        required={required}
        value={formValues?.current[id] || inputValue}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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

      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      {
        elementsToValidate?.[id] === "" && isFormError && <RequiredFieldError />
      }
    </div>
  );
};

export default SelectFieldSubmitComp;
