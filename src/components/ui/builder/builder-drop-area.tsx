"use client"

// import { useElementState } from "@/store/element-store";
import { randomID } from "@/utility/randomID";
import { FormElemets } from "@/utility/static-data";
import { ElementsType, FormElemetInstance } from "@/utility/ts-types";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import DesignerSidebar from "./builder-sidebar/builder-sidebar";
import BuilderElemetWrapper from "./builder-element-wrapper";
import useElements from "@/utility/useElements-hook";
import { Download } from "lucide-react";

const BuilderDropArea = () => {
  const {addElement, elements, deleteElement} = useElements()

  const { setNodeRef, isOver } = useDroppable({
    id: "designer-drop-area",
    data: { isDesignerDropArea: true },
  });

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;

      //dropping sidebar btn over drop area
      const isDesignerDropArea = over.data.current?.isDesignerDropArea;
      const droppingDesignerBtnOverDropArea = isDesignerBtnElement && isDesignerDropArea;

      if (droppingDesignerBtnOverDropArea) {
        const type = active.data.current?.type;

        const newElement = FormElemets[type as ElementsType].construct(
          randomID()
        );

        addElement(elements?.length, newElement);
        return;
      }

      //dropping sidebar btn over a existing designerElement exisiting in dropArea
      const isTopHalfDropArea = over.data.current?.isTopHalf;
      const isBottonHalfDropArea = over.data.current?.isBottomHalf;

      const isDroppingOverDesignerElement = isTopHalfDropArea || isBottonHalfDropArea;
      const droppingSidebarButtonOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;

      if (droppingSidebarButtonOverDesignerElement) {
        const type = active.data.current?.type;

        const newElement = FormElemets[type as ElementsType].construct(
          randomID()
        );

        const indexOfNewElement = elements?.findIndex((el) => el.id === over.data.current?.id);

        if (indexOfNewElement === -1) {
          throw new Error("element not found");
        }

        if (isBottonHalfDropArea) {
          addElement(indexOfNewElement + 1, newElement);
        } else {
          addElement(indexOfNewElement, newElement);
        }

        // console.log(`index of IsOverElement  : ${indexOfNewElement}`);
        return;
      }

      //  drag and drop of designerElement with in Designer elements
      const isDesignerElement = active.data.current;
      const designerElementId = active.data.current?.id;
      const droppingDesignerElementOverDesignerElement = (isDesignerElement && isTopHalfDropArea) || isBottonHalfDropArea;

      if (droppingDesignerElementOverDesignerElement) {
        const indexOfNewElement = over.data.current?.id && elements?.findIndex((el) => el.id === over.data.current?.id);

        if (indexOfNewElement === -1) {
          throw new Error("element not found");
        }

        const activeElementIndex = elements?.findIndex((el) => el.id === designerElementId);
        const activeDesignerElement = { ...elements[activeElementIndex] };
        deleteElement(designerElementId);

        if (isTopHalfDropArea) {
          addElement(indexOfNewElement, activeDesignerElement);
        } else {
          addElement(indexOfNewElement + 1, activeDesignerElement);
        }

        return;
      }
    },
  });

  return (
    <main className="flex h-full">
    
      <div className="min-h-0 h-full flex-grow overflow-y-auto py-4">
        <div
          ref={setNodeRef}
          className={`max-w-[720px] flex flex-col gap-2 min-h-full mx-auto p-2 border-dotted border-black/20 border-2 rounded-md ${
            isOver ? "border-black/50" : ""
          }`}
        >
          {elements?.length === 0 && !isOver ? (
            <DropHereContainer/>
          ) : (
            <div className="flex flex-col gap-2">
              {elements?.length>0 && elements?.map((el: FormElemetInstance) => (
                <BuilderElemetWrapper element={el} key={el?.id} />
              ))}
            </div>
          )}
          {isOver && elements?.length === 0 && (
            <div className="h-[100px] w-full bg-black/5 rounded-xl"></div>
          )}
        </div>
      </div>
  
        <DesignerSidebar />
    </main>
  );
};

export default BuilderDropArea;




const DropHereContainer = () => {
  return (
    <div className="flex flex-grow justify-center items-center gap-2 text-xl">
    Drop here <Download/>
  </div>
  )
}