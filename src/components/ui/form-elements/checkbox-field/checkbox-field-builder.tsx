import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { CheckboxCustomInstance } from "./checkbox-prop-attributes";

const CheckBoxFieldBuilderComp: FC<FormElementProps> = ({
  elementInstance,
}) => {
  const { extraAttributes } = elementInstance as CheckboxCustomInstance;
  const { label, helperText, required } = extraAttributes;

  return (
    <div className="flex flex-col gap-1 justify-start items-start text-black">
      <div className="flex items-center gap-2">
        <input type="checkbox" disabled className="h-4 w-4 accent-primary" />
        <p className="text-md">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      </div>
      
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default CheckBoxFieldBuilderComp;
