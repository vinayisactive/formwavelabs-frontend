"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { FORM_ELEMENTS, FormElemets, LAYOUT_ELEMENTS } from "@/utility/static-data";
import ElementButton from "./element-btn";

const SectionLabel: FC<{ label: string }> = ({ label }) => (
  <div className="text-sm py-1 px-2 font-bold text-black">{label} elements</div>
);

const ElementsContainer = ({
  setElementModalActive,
}: {
  setElementModalActive?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <aside className="">
      <SectionLabel label="Form" />
      <div className="flex gap-2 flex-wrap mb-8 rounded-md p-2">
        {FORM_ELEMENTS.map((type) => (
          <ElementButton key={type} element={FormElemets[type]} setElementModalActive={setElementModalActive} />
        ))}
      </div>

      <SectionLabel label="Layout" />
      <div className="flex gap-2 flex-wrap p-2">
        {LAYOUT_ELEMENTS.map((type) => (
          <ElementButton key={type} element={FormElemets[type]} setElementModalActive={setElementModalActive} />
        ))}
      </div>
    </aside>
  );
};

export default ElementsContainer;