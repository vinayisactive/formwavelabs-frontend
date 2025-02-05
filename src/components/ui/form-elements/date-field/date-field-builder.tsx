import { FormElementProps } from "@/utility/ts-types";
import { DateFieldCustomElement } from "./date-prop-attributes";
import { FC } from "react";

const DateFieldBuilderComp: FC<FormElementProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as DateFieldCustomElement;
  const { label, helperText, required } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-1 justify-start items-start text-black">
      <p className="text-md">
        {label} <span>{required && "*"}</span>
      </p>
      <input type="date" required={required} readOnly/>
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default DateFieldBuilderComp;
