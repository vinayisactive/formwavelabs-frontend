import React from "react";
import useElements from "@/utility/useElements-hook";
import { FormElemetInstance } from "@/utility/ts-types";
import DndDraggableButton from "../dnd-reusable/dnd-draggable-button";

const MobileBuilderPreview = ({theme}: {theme: "BOXY" | "ROUNDED" | undefined}) => {
  const { elements } = useElements();

  return (
    <div className={` w-full flex flex-col max-w-3xl gap-5 p-2 mx-auto shadow-md  bg-white ${ theme === "BOXY" ? "border-r-4 border-b-4 border-black border" : "border rounded-md"}`}>
      {elements?.map((el: FormElemetInstance) => {
        return (
          <div key={el?.id}>
            <DndDraggableButton element={el} isElementTile={false} />
          </div>
        );
      })}

      {elements.length === 0 && (
        <div className="text-center">Add form elements in builder</div>
      )}
    </div>
  );
};

export default MobileBuilderPreview;
