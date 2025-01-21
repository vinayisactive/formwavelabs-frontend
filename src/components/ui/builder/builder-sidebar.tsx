"use client";

import { FormElemets } from "@/utility/static-data";
import SidebarBtnElement from "./builder-sidebar-btn";
import useElements from "@/utility/useElements-hook";


const DesignerSidebar = () => {
  const {selectedElementInstance} = useElements();


  let PropertiesFormSidebar;

  if(selectedElementInstance) {
    PropertiesFormSidebar = FormElemets[selectedElementInstance?.type].propertiesComponent
  }

  return (
    <aside className="w-[400px] max-w-[400px] border flex flex-col gap-3">
      {!selectedElementInstance && (
        <div className="border flex flex-grow flex-col gap-1 p-2">
          <p className="text-xl">FormElemets</p>
          <div className="flex flex-grow">
            <SidebarBtnElement FormElement={FormElemets.TextFiled} />
          </div>
        </div>
      )}

      {selectedElementInstance && (
        <div className="flex flex-grow p-2">
         {PropertiesFormSidebar && <PropertiesFormSidebar elementInstance={selectedElementInstance} />} 
        </div>
      )}
    </aside>
  );
};

export default DesignerSidebar;
