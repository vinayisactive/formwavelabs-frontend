"use client";

import { FormElemets } from "@/utility/static-data";
import useElements from "@/utility/useElements-hook";
import { ElementsType } from "@/utility/ts-types";
import SidebarFormElements from "./sidebar-form-elements";

const elementOrder: ElementsType[] = ["TextFiled", "SelectField", "CheckboxField", "RadioButtonField", "TextAreaField", "YesAndNoField", "MultipleChoiceField", "DateField", "FileUploadField"];

const DesignerSidebar = () => {
  const { selectedElementInstance } = useElements();

  let PropertiesFormSidebar;
  if (selectedElementInstance) {
    PropertiesFormSidebar =
      FormElemets[selectedElementInstance?.type].propertiesComponent;
  }

  return (
    <aside className="w-[200px] md:w-[400px] max-w-[400px] h-[100%] overflow-y-auto flex flex-col gap-3 border-l pt-2">
      {!selectedElementInstance && (
        <SidebarFormElements
          elementOrder={elementOrder}
          FormElements={FormElemets}
        />
      )}

      {selectedElementInstance && PropertiesFormSidebar && (
        <PropertiesFormSidebar elementInstance={selectedElementInstance} />
      )}
    </aside>
  );
};

export default DesignerSidebar;












