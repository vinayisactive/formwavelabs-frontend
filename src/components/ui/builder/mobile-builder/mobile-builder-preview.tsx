import React from "react";
import useElements from "@/utility/useElements-hook";
import { FormElemetInstance } from "@/utility/ts-types";
import { FormElemets } from "@/utility/static-data";
import { Pencil, Trash } from "lucide-react";

const MobileBuilderPreview = ({
  theme,
}: {
  theme: "BOXY" | "ROUNDED" | undefined;
}) => {
  const { elements, setSelectedElementInstance, deleteElement } = useElements();
  
  return (
    <div className="w-full px-1 flex justify-between">
      <div
        className={` w-full flex flex-col max-w-3xl gap-5 p-2 mx-auto shadow-md  bg-white ${
          theme === "BOXY"
            ? "border-r-4 border-b-4 border-black border"
            : "border rounded-tl-md"
        }`}
      >
        {elements?.map((el: FormElemetInstance) => {
          const Element = FormElemets[el.type].submit; 

          return (
            <div key={el?.id} className="w-full flex gap-2 justify-between px-1">

              <div className="flex flex-col gap-2 justify-center items-center flex-grow">
                <span className="p-1  text-black rounded-md hover:bg-gray-300 ">
                  <Pencil size={13} onClick={() => setSelectedElementInstance(el)} className="cursor-pointer"/>
                </span>

                <span className="p-1  text-black rounded-md hover:bg-gray-300">
                  <Trash size={13} onClick={() => deleteElement(el?.id)} className="cursor-pointer"/>
                </span>
              </div>
              
              <div className="w-full ">
               <Element elementInstance={el} theme={theme} />
              </div>
            </div>
          );
        })}

        {elements.length === 0 && (
          <div className="text-center">Add form elements in builder</div>
        )}
      </div>
    </div>
  );
};

export default MobileBuilderPreview;
