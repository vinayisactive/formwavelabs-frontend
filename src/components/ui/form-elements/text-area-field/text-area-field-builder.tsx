import { FormElementProps } from "@/utility/ts-types";
import { TextAreaCustomInstance } from "./text-area-prop-attributes";
import { FC } from "react";

const TextAreaBuilderComp: FC<FormElementProps>= ({
  elementInstance,
}) => {
  const element = elementInstance as TextAreaCustomInstance;
  const { label, helperText, placeholder, required } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-1 justify-start items-start text-black">
      <p className="text-md">
        {label} <span>{required && "*"}</span>
      </p>
      <textarea
        readOnly
        disabled
        className="border-2 border-black w-full rounded-lg px-3 py-1"
        placeholder={placeholder}
      />

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default TextAreaBuilderComp;
