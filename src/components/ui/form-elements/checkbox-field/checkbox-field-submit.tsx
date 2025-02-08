"use client";
import { FC, useState } from "react";
import { submitCompPropsType } from "@/utility/ts-types";
import { CheckboxCustomInstance } from "./checkbox-prop-attributes";
import { RequiredFieldError } from "../property-reusable-comp";


const CheckBoxFieldSubmitComp: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError
}) => {
  const { id, extraAttributes } = elementInstance as CheckboxCustomInstance;
  const { label, helperText, required } = extraAttributes;
  const [checked, setChecked] = useState<boolean>(
    formValues?.current?.[id] === "true"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if(required){
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: isChecked ? undefined : "",
      }));
    }

    setChecked(isChecked);
    handleValues?.(id, isChecked.toString());
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          required={required}
          checked={checked}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label 
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      {elementsToValidate?.[id] === "" && isFormError && <RequiredFieldError/>}
    </div>
  );
};

export default CheckBoxFieldSubmitComp;
