"use client";
import { FC, useState } from "react";
import { submitCompPropsType } from "@/utility/ts-types";
import { CheckboxCustomInstance } from "./checkbox-prop-attributes";
import { RequiredFieldError } from "../elements-reusable-comp";

const CheckBoxFieldSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
  theme,
}) => {
  const { id, extraAttributes } = elementInstance as CheckboxCustomInstance;
  const { label, helperText, required } = extraAttributes;
  const [checked, setChecked] = useState<boolean>(
    formValues?.[id]?.value === "true"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: isChecked ? undefined : "",
      }));
    }

    setChecked(isChecked);
    handleValues?.(id, {
      id,
      value: isChecked.toString(),
      label: extraAttributes.label,
    });
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
          className={`h-4 w-4 text-black accent-black border-gray-300 rounded-md ${
            theme === "BOXY" ? " checked:ring-black" : ""
          } `}
        />
        <label htmlFor={id} className="text-xl font-medium text-black">
          {label}
          {required && <span className="text-xs ml-1">{"(req)"}</span>}
        </label>
      </div>

      <div className="flex justify-start items-center gap-2 -mt-1">
        {helperText && (
          <p className="text-xs text-gray-500 bg-black/5 px-2 rounded-sm">
            {helperText}
          </p>
        )}
        {elementsToValidate?.[id] === "" && isFormError && (
          <RequiredFieldError requiredStyleClass=""/>
        )}
      </div>
    </div>
  );
};

export default CheckBoxFieldSubmit;
