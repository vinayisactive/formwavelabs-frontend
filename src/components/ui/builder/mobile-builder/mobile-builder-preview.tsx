import React from "react";
import useElements from "@/utility/useElements-hook";
import { FormElemetInstance } from "@/utility/ts-types";
import { FormElemets } from "@/utility/static-data";

const MobileBuilderPreview = ({
  theme,
}: {
  theme: "BOXY" | "ROUNDED" | undefined;
}) => {
  const { elements } = useElements();
  
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
            <div key={el?.id}>
              <Element elementInstance={el} />
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
