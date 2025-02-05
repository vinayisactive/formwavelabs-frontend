"use client"
import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { RadioButtonCustomInstance } from "./radio-btn-prop-attributes";


const RadioBtnFieldBuilderComp: FC<FormElementProps> = ({
  elementInstance,
}) => {
  const { extraAttributes } = elementInstance as RadioButtonCustomInstance;
  const { label, helperText, required, options } = extraAttributes;

  return (
    <div className="flex flex-col gap-1 justify-start items-start w-full text-black">
      <p className="text-md">
        {label ? label : "Radio select"}{required && <span className="text-red-500">*</span>}
      </p>
      
      <div className="flex flex-col gap-2 w-full">
        {options?.map((option) => (
          <div 
            key={option}
            className="flex items-center gap-2"
          >
            <input 
              type="radio"
              id={`${elementInstance.id}-${option}`}
              name={elementInstance.id}
              value={option}
              className="h-4 w-4 accent-primary"
            />
            <label 
              htmlFor={`${elementInstance.id}-${option}`}
              className="text-sm"
            >
              {option}
            </label>
          </div>
        ))}
      </div>

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default RadioBtnFieldBuilderComp;