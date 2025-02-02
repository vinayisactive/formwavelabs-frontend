import { FC } from "react";
import { FormElemetInstance } from "@/utility/ts-types";
import { selectFieldCustomInstance } from "./select-prop-attributes";

interface SelectFieldBuilderCompProps {
  elementInstance: FormElemetInstance;
}

const SelectFieldBuilderComp: FC<SelectFieldBuilderCompProps> = ({
  elementInstance,
}) => {
  const { extraAttributes } = elementInstance as selectFieldCustomInstance;
  const { label, helperText, required, options, selectPlaceHolder } =
    extraAttributes;

  return (
    <div className="flex flex-col gap-1 justify-start items-start text-black">
      <p className="text-md">
        {label} <span>{required && "*"}</span>
      </p>
      <select
        className="border-2 border-black w-full rounded-lg px-3 py-1"
        value=""
      >
        <option value="" className="text-black">
          {selectPlaceHolder}
        </option>
        {options &&
          options.map((option) => (
            <option key={option} value={option} disabled>
              {option}
            </option>
          ))}
      </select>

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default SelectFieldBuilderComp;
