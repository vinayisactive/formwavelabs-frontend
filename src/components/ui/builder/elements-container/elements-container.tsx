"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { ElementsType, LayoutElementsType } from "@/utility/ts-types";
import { FormElemets } from "@/utility/static-data";
import ElementButton from "./element-btn";

const formElementTypes: (ElementsType)[] = [
  "TextField",
  "SelectField",
  "EmailField",
  "CheckboxField",
  "RadioButtonField",
  "TextAreaField",
  "YesAndNoField",
  "MultipleChoiceField",
  "DateField",
  "FileUploadField",
];

const layoutElementTypes : (LayoutElementsType)[] = ["FormHeader" , "LayoutImage"]

const SectionLabel: FC<{ label: string }> = ({ label }) => (
  <div className="text-sm py-1 px-2 font-bold text-black">{label} Elements</div>
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
        {formElementTypes.map((type) => (
          <ElementButton key={type} element={FormElemets[type]} setElementModalActive={setElementModalActive} />
        ))}
      </div>

      <SectionLabel label="Layout" />
      <div className="flex gap-2 flex-wrap p-2">
        {layoutElementTypes.map((type) => (
          <ElementButton key={type} element={FormElemets[type]} setElementModalActive={setElementModalActive} />
        ))}
      </div>
    </aside>
  );
};

export default ElementsContainer;

























// const { selectedElementInstance } = useElements();

// let PropertiesFormSidebar;
// if (selectedElementInstance) {
//   PropertiesFormSidebar =
//     FormElemets[selectedElementInstance?.type].propertiesComponent;
// }

{
  /* {selectedElementInstance && PropertiesFormSidebar && (
        <PropertiesFormSidebar elementInstance={selectedElementInstance} />
      )} */
}
