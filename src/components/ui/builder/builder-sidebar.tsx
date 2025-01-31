"use client";

import { FormElemets } from "@/utility/static-data";
import SidebarBtnElement from "./builder-sidebar-btn";
import useElements from "@/utility/useElements-hook";
import { ElementsType } from "@/utility/ts-types";

const ELEMENT_ORDER: ElementsType[] = ["TextFiled"];

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
    <aside className="w-[400px] max-w-[400px] flex flex-col gap-3">
      {!selectedElementInstance && (
        <div className="border-l flex flex-grow flex-col gap-1 p-2">
          <div className="flex flex-col gap-2 flex-grow">
            <ElementsLable type="Form" />
            <div>
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
        <div className="flex flex-grow p-2">
          {PropertiesFormSidebar && (
            <PropertiesFormSidebar elementInstance={selectedElementInstance} />
          )}
        </div>
      )}
    </aside>
  );
};

export default DesignerSidebar;
