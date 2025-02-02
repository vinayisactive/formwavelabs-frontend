"use client";

import { FormElemets } from "@/utility/static-data";
import { FormElemetInstance } from "@/utility/ts-types";
import useElements from "@/utility/useElements-hook";
import React from "react";

const BuilderPreview = () => {
  const { elements } = useElements();

  return (
    <div className="w-full h-full overflow-y-scroll py-4 scroll-smooth">
      <div className="flex flex-col w-2/3 border-2 border-dotted border-black/20 rounded-md gap-5 p-2 mx-auto">
        {elements.map((el: FormElemetInstance) => {
          const SubmitComponent = FormElemets[el.type].submitComponent;
          return (
            <div key={el.id}>
              <SubmitComponent elementInstance={el} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuilderPreview;
