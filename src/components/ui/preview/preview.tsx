"use client";

import { FormElemets } from "@/utility/static-data";
import { FormElemetInstance } from "@/utility/ts-types";
import useElements from "@/utility/useElements-hook";
import React from "react";

const Preview = () => {
  const { elements } = useElements();

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <div className="flex flex-col w-2/3 border gap-5">
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

export default Preview;
