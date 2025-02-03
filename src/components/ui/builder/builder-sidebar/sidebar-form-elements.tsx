import { ElementsType, FormElemetsType } from "@/utility/ts-types";
import { FC } from "react";
import SidebarBtnElement from "./builder-sidebar-btn";

interface ElementsSidebarProps {
    elementOrder: ElementsType[];
    FormElements: FormElemetsType;
  }

  const ElementsLable = ({ type }: { type: string }) => {
    return (
      <div className="text-sm px-2 py-1 border-black/10 border-2 border-dotted rounded-md">
        <p>{`${type} Elements`}</p>
      </div>
    );
  };
  
const SidebarFormElements: FC<ElementsSidebarProps> = ({
    elementOrder,
    FormElements,
  }) => {
    return (
      <div className="h-full p-2 space-y-2">
        <ElementsLable type="Form" />
        <div className="flex gap-2 flex-wrap">
          {elementOrder.map((el) => (
            <SidebarBtnElement FormElement={FormElements[el]} key={el} />
          ))}
        </div>
      </div>
    );
  };
  

  export default SidebarFormElements