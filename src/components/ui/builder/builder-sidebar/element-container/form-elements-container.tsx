"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { ElementsType, LayoutElementsType } from "@/utility/ts-types";
import { FormElemets } from "@/utility/static-data";
import ElementButton from "./element-btn";

const formElementTypes: (ElementsType | LayoutElementsType)[] = [
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
  "FormHeader",
  "LayoutImage"
];

const SectionLabel: FC<{ label: string }> = ({ label }) => (
  <div className="text-sm py-1 px-2 font-bold text-black">{label} Elements</div>
);

const FormElementsContainer = ({
  setElementModalActive,
}: {
  setElementModalActive?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <aside className="border md:border-none bg-white md:bg-transparent rounded-md ml-2">
      <SectionLabel label="Form" />
      <div className="flex gap-2 flex-wrap p-2 border rounded-md overflow-y-auto scroll-smooth md:max-h-48">
        {formElementTypes.map((type) => (
          <ElementButton key={type} element={FormElemets[type]} setElementModalActive={setElementModalActive} />
        ))}
      </div>
    </aside>
  );
};

export default FormElementsContainer;

























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
