"use client";

import { FormElemets } from "@/utility/static-data";
// import useElements from "@/utility/useElements-hook";
import { ElementsType } from "@/utility/ts-types";
import SidebarFormElements from "./sidebar-form-elements";

const elementOrder: ElementsType[] = [
  "TextFiled",
  "SelectField",
  "CheckboxField",
  "RadioButtonField",
  "TextAreaField",
  "YesAndNoField",
  "MultipleChoiceField",
  "DateField",
  "FileUploadField",
];

const DesignerSidebar = () => {
  return (
    <aside className="w-[150px] md:w-[250px] lg:w-[300px] max-w-[400px] border-2 border-red-500">
      <SidebarFormElements
        elementOrder={elementOrder}
        FormElements={FormElemets}
      />
    </aside>
  );
};

export default DesignerSidebar;































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
