"use client";

import { FormElemets } from "@/utility/static-data";
import { FormElemetInstance } from "@/utility/ts-types";
import useElements from "@/utility/useElements-hook";

const BuilderPreview = ({formTheme}: {formTheme: "BOXY" | "ROUNDED" | undefined}) => {
  const { elements } = useElements();
 
  return (
    <div className="w-full h-full overflow-y-scroll py-4 scroll-smooth">
      <div className={`flex flex-col max-w-3xl gap-5 p-2 mx-auto shadow-md  bg-white ${formTheme === "BOXY" ? "border-r-4 border-b-4 border-black border" : "border rounded-md"}`}>
        {elements.map((el: FormElemetInstance) => {
          const SubmitComponent = FormElemets[el.type].submit;
          return (
            <div key={el.id}> 
              <SubmitComponent elementInstance={el}  theme={formTheme}/>
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

export default BuilderPreview;
