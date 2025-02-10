import { FC } from "react";
import { selectFieldCustomInstance } from "./select-prop-attributes";
import { FormElementProps } from "@/utility/ts-types";
import { GripVertical } from "lucide-react";

const SelectFieldBuilderComp: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as selectFieldCustomInstance).extraAttributes;

  return (
    <div className="cursor-grab hover:shadow-sm transition-all">
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground/50" />
        <div className="flex flex-col">
        <span className="text-xs font-medium text-foreground/80 overflow-hidden">{label.slice(0, 10)}...</span>
          <span className="text-[0.7rem] text-muted-foreground">Dropdown</span>
        </div>
      </div>
    </div>
  );
};

export default SelectFieldBuilderComp;