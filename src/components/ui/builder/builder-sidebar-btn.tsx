"use client";

import { FormElement } from "@/utility/ts-types";
import { useDraggable } from "@dnd-kit/core";
import { LucideIcon, TextCursorInput } from "lucide-react";

type FormElementType = FormElement["elementButton"]["label"];

export const IconMap: Record<FormElementType, LucideIcon> = {
  "TextField": TextCursorInput,
};

const SidebarBtnElement = ({ FormElement }: { FormElement: FormElement}) => {
  const label = FormElement.elementButton.label;
  const Icon = IconMap[label];

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `designer-btn-${FormElement.type}`,
    data: {
      type: FormElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`w-[50px] h-[50px] flex justify-center items-center border-2 rounded-md cursor-grab ${
        isDragging ? "bg-black text-white" : ""
      }`}
    >
      <Icon/>
    </button>
  );
};

export default SidebarBtnElement;
