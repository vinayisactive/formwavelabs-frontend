import { FormElementProps } from "@/utility/ts-types";
import { TextCustomInstance } from "./text-prop-attributes";
import { FC } from "react";

const TextFieldBuilderComp: FC<FormElementProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as TextCustomInstance;
  const { label, helperText, placeholder, required } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-1 justify-start items-start text-black">
      <p className="text-md">
        {label} <span>{required && "*"}</span>
      </p>
      <input
        type="text"
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

export default TextFieldBuilderComp;
