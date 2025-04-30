"use client";

import { Dispatch, FC, SetStateAction } from "react";
import {
  FORM_ELEMENTS,
  FormElemets,
  LAYOUT_ELEMENTS,
} from "@/utility/static-data";
import {
  Check,
  CloudUpload,
  Heading1Icon,
  Layout,
  List,
  LucideIcon,
  Mail,
  MousePointer2,
  Text,
  TextCursorInput,
  TextSelectIcon,
  ToggleLeft,
} from "lucide-react";
import { IconType } from "react-icons";
import { randomID } from "@/utility/randomID";
import useElements from "@/utility/useElements-hook";
import { IoCalendarOutline } from "react-icons/io5";
import {
  FormElement,
  FormFieldsElementsType,
  LayoutElementsType,
} from "@/utility/ts-types";

type ElementButtonLabel = FormElement["elementButton"];

export const IconMap: Record<ElementButtonLabel, LucideIcon | IconType> = {
  "Text Input": TextCursorInput,
  Dropdown: TextSelectIcon,
  "Check Box": ToggleLeft,
  "Single Selection": MousePointer2,
  "Text Area": Text,
  "Yes / No": Check,
  "Multi Selection": List,
  "Date Input": IoCalendarOutline,
  "Upload File": CloudUpload,
  "Email Input": Mail,
  Header: Heading1Icon,
  "Layout Image": Layout,
};

const ElementButton = ({
  element,
  setElementModalActive,
}: {
  element: FormElement;
  setElementModalActive?: Dispatch<SetStateAction<boolean>>;
}) => {
  const buttonLabel = element?.elementButton;
  const Icon = IconMap[buttonLabel];

  const { elements, addElement } = useElements();

  const addElementHandler = () => {
    const newElement = FormElemets[
      element?.type as FormFieldsElementsType | LayoutElementsType
    ]?.construct(randomID());

    if (!newElement) {
      return;
    }

    addElement(elements?.length, newElement);
    setElementModalActive?.(false);
  };

  return (
    <button
      className="flex justify-center items-center gap-2 border-2 rounded-xl  cursor-pointer  px-3 text-[13px] py-1.5   whitespace-nowrap hover:border-black hover:bg-black hover:text-white group"
      onClick={addElementHandler}
    >
      {buttonLabel}
      <Icon size={12} className=" group-hover:scale-150" />
    </button>
  );
};

const SectionLabel: FC<{ label: string }> = ({ label }) => (
  <div className="text-sm py-1 px-3 font-bold text-black">{label} elements</div>
);


const ElementsContainer = ({
  setElementModalActive,
}: {
  setElementModalActive?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <aside className="">
      <SectionLabel label="Form" />
      <div className="flex gap-2 flex-wrap mb-8 rounded-md p-2">
        {FORM_ELEMENTS.map((type) => (
          <ElementButton
            key={type}
            element={FormElemets[type]}
            setElementModalActive={setElementModalActive}
          />
        ))}
      </div>

      <SectionLabel label="Design" />
      <div className="flex gap-2 flex-wrap p-2">
        {LAYOUT_ELEMENTS.map((type) => (
          <ElementButton
            key={type}
            element={FormElemets[type]}
            setElementModalActive={setElementModalActive}
          />
        ))}
      </div>
    </aside>
  );
};

export default ElementsContainer;