"use client";

import { FormElemets } from "@/utility/static-data";
import { FormElemetInstance } from "@/utility/ts-types";
import useElements from "@/utility/useElements-hook";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

const DndDraggableButton = ({ element, isElementTile }: { element: FormElemetInstance, isElementTile: boolean }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isMouseOver, setMouseOver] = useState(false);
  const [isElementDragging, setIsElementDragging] = useState<boolean>(false);

  const { setSelectedElementInstance, deleteElement, elements, addElement } =
    useElements();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  let ChildElement ; 

  if(isElementTile){
    ChildElement = FormElemets[element?.type]?.tile;
  }else{
    ChildElement = FormElemets[element?.type].submit; 
  }

  const topHalf = useDroppable({
    id: `${element?.id}-top`,
    data: { type: element?.type, id: element?.id, isTopHalf: true },
  });

  const bottomHalf = useDroppable({
    id: `${element?.id}-bottom`,
    data: { type: element?.type, id: element?.id, isBottomHalf: true },
  });

  const draggable = useDraggable({
    id: element?.id + "-drag-handler",
    data: {
      type: element?.type,
      id: element?.id,
      isElementTile : isElementTile
    },
  });

  useDndMonitor({
    onDragStart(){
      setIsElementDragging(true);
    },

    onDragEnd(event) {
      setIsElementDragging(false);
      const { active, over } = event;
      if (!active || !over) return;

      const isTopHalf = over.data.current?.isTopHalf;
      const isBottomHalf = over.data.current?.isBottomHalf;
      const elementTileId = active.data.current?.id;

      const handleElementReorder = () => {
        const overIndex = elements.findIndex(
          (el) => el.id === over.data.current?.id
        );
        if (overIndex === -1) throw new Error("Element not found");

        const activeIndex = elements.findIndex((el) => el.id === elementTileId);
        const elementToMove = { ...elements[activeIndex] };

        deleteElement(elementTileId);
        addElement(isTopHalf ? overIndex : overIndex + 1, elementToMove);
      };

      if (elementTileId && (isTopHalf || isBottomHalf)) {
        handleElementReorder();
      }
    },
  });

  if (draggable.isDragging) return null;
  if (!isMounted) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative group bg-white backdrop-blur-md rounded-lg  transition-all cursor-pointer whitespace-nowrap group-hover:border-2:"
      onMouseEnter={() =>{
        if(!isElementDragging)
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        if(!isElementDragging)
        setMouseOver(false);}}
      onClick={() => setMouseOver(isMouseOver)}
    >

      <div
        ref={topHalf.setNodeRef}
        className={`absolute  top-0 left-0 w-full h-1/2 rounded-t-lg ${
          topHalf.isOver ? "border-t-4 border-blue-400 z-10" : ""
        }`}
      />

      <div
        ref={bottomHalf.setNodeRef}
        className={`absolute  bottom-0 left-0 w-full h-1/2 rounded-b-lg ${
          bottomHalf.isOver ? "border-b-4 border-blue-400 z-10" : ""
        }`}
      />

      <div
        className={`h-full transition-opacity ${
          isMouseOver ? "opacity-20" : "opacity-100"
        }`}
      >
        <ChildElement elementInstance={element} />
      </div>

      {isMouseOver && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-md rounded-lg flex items-center justify-center gap-4 group:">
          <div
            className="flex flex-col items-center gap-2 text-gray-600"
            onClick={() => {
              setSelectedElementInstance(null);
              setTimeout(() => {
                setSelectedElementInstance(element);
              }, 0);
            }}
          >
            <Pencil className="w-6 h-6" />
          </div>

          <button
            className="p-1.5 hover:bg-red-100 rounded-md transition-colors"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              deleteElement(element.id);
              setSelectedElementInstance(null);
            }}
          >
            <Trash className="w-6 h-6 text-red-500 hover:text-red-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DndDraggableButton;
