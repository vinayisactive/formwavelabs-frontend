"use client";

import { FormElement } from "@/utility/ts-types";
import { useDraggable } from "@dnd-kit/core";
import { Calendar, LucideIcon, MousePointer2, Text, TextCursorInput, TextSelectIcon, TicketCheck, ToggleLeft } from "lucide-react";
import { SlOptionsVertical } from "react-icons/sl";
import { IconType } from "react-icons";

type FormElementType = FormElement["elementButton"]["label"];

export const IconMap: Record<FormElementType, LucideIcon | IconType> = {
  "TextField": TextCursorInput,
  "SelectField" : TextSelectIcon,
  "CheckboxField": ToggleLeft,
  "RadioButtonField": MousePointer2,
  "TextAreaField" : Text,
  "YesAndNoField": TicketCheck,
  "MultipleChoiceField": SlOptionsVertical,
  "DateField": Calendar
};

const SidebarBtnElement = ({ FormElement }: { FormElement: FormElement}) => {
  const label = FormElement?.elementButton.label;
  const Icon = IconMap[label];

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `designer-btn-${FormElement?.type}`,
    data: {
      type: FormElement?.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={` w-full md:w-[50px] h-[50px] flex justify-center items-center border-2 rounded-md cursor-grab ${
        isDragging ? "bg-black text-white" : ""
      }`}
    >
      <Icon/>
    </button>
  );
};

export default SidebarBtnElement;
