"use client";

import { ElementsType, FormElement } from "@/utility/ts-types";
import {
  Calendar,
  LucideIcon,
  MousePointer2,
  Text,
  TextCursorInput,
  TextSelectIcon,
  TicketCheck,
  ToggleLeft,
} from "lucide-react";
import { SlOptionsVertical } from "react-icons/sl";
import { IconType } from "react-icons";
import { FaFileUpload } from "react-icons/fa";
import { FormElemets } from "@/utility/static-data";
import { randomID } from "@/utility/randomID";
import useElements from "@/utility/useElements-hook";
import { Dispatch, SetStateAction } from "react";


type ElementButtonLabel = FormElement["elementButton"];

const ElementButtonIBetterLabels: Record<ElementButtonLabel, string> = {
  TextField: "Input",
  SelectField: "Select",
  CheckboxField: "Check box",
  RadioButtonField: "Radio Buttons",
  TextAreaField: "Text area",
  YesAndNoField: "Yes / no",
  MultipleChoiceField: "Multiple choice",
  DateField: "Date",
  FileUploadField: "Upload file",
};

export const IconMap: Record<ElementButtonLabel, LucideIcon | IconType> = {
  "TextField": TextCursorInput,
  "SelectField" : TextSelectIcon,
  "CheckboxField": ToggleLeft,
  "RadioButtonField": MousePointer2,
  "TextAreaField" : Text,
  "YesAndNoField": TicketCheck,
  "MultipleChoiceField": SlOptionsVertical,
  "DateField": Calendar,
  "FileUploadField" : FaFileUpload
};



const ElementButton = ({ element, setElementModalActive }: { element: FormElement, setElementModalActive?: Dispatch<SetStateAction<boolean>> }) => {
  const buttonLabel = element?.elementButton;
  const label = ElementButtonIBetterLabels[buttonLabel];
  const Icon = IconMap[buttonLabel];

  const { elements, addElement } = useElements();

  const addElementHandler = () => {
    const newElement = FormElemets[element?.type as ElementsType].construct(
      randomID()
    );

    if (!newElement) {
      return;
    }

    addElement(elements?.length, newElement);
    setElementModalActive?.(false);
  };

  return (
    <button
      className="flex justify-center items-center gap-2 border-2 rounded-md cursor-pointer text-sm px-2 py-1 whitespace-nowrap hover:border-black hover:bg-black hover:text-white"
      onClick={addElementHandler}
    >
      {label} <Icon size={15}/>
    </button>
  );
};

export default ElementButton;
