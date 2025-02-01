"use client";

import { FormElemets } from "@/utility/static-data";
import SidebarBtnElement from "./builder-sidebar-btn";
import useElements from "@/utility/useElements-hook";
import { ElementsType } from "@/utility/ts-types";

const ELEMENT_ORDER: ElementsType[] = ["TextFiled", "SelectField"];

const ElementsLable = ({ type }: { type: string }) => {
  return (
    <div className="text-sm px-2 py-1 border-black/10 border-2 border-dotted rounded-md">
      <p>{`${type} Elements`}</p>
    </div>
  );
};

const DesignerSidebar = () => {
  const { selectedElementInstance } = useElements();
  let PropertiesFormSidebar;

  if (selectedElementInstance) {
    PropertiesFormSidebar =
      FormElemets[selectedElementInstance?.type].propertiesComponent;
  }

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col gap-3 sticky top-0">
      {!selectedElementInstance && (
        <div className="w-full h-[80vh] bg-white rounded-xl shadow-lg p-4 space-y-5 border-gray-100 overflow-y-scroll">
          <div className="flex flex-col gap-2 flex-grow">
            <ElementsLable type="Form" />
            <div className="flex gap-2">
              {ELEMENT_ORDER.map((el) => {
                return (
                  <SidebarBtnElement FormElement={FormElemets[el]} key={el} />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedElementInstance && (
        <div className="flex flex-grow">
          {PropertiesFormSidebar && (
            <PropertiesFormSidebar elementInstance={selectedElementInstance} />
          )}
        </div>
      )}
    </aside>
  );
};

export default DesignerSidebar;
