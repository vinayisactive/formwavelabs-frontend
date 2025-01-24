"use client";

import { FormElemets } from "@/utility/static-data";
import { FormElemetInstance } from "@/utility/ts-types";
import useElements from "@/utility/useElements-hook";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";

const BuilderElemetWrapper = ({element}: {element: FormElemetInstance}) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isMouseOver, setMouseOver] = useState(false);

    const {setSelectedElementInstance, deleteElement} = useElements();
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
    
    const BuilderComponent = FormElemets[element?.type]?.builderComponent; 
  
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
        isDesignerElement: true,
      },
    });
  
    if (draggable.isDragging) return null;
  
    if (!isMounted) return null;
  
    return (
      <div
        ref={draggable.setNodeRef}
        {...draggable.listeners}
        {...draggable.attributes}
        className="p-2 bg-black/10 rounded-md h-[120px] relative flex flex-col justify-center cursor-pointer"
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        onClick={() =>{ 
          setSelectedElementInstance(null);

          setTimeout(() => {
            setSelectedElementInstance(element)
          }, 0);
        }}
      >
        <div
          ref={topHalf.setNodeRef}
          className={`h-1/2 absolute top-0 left-0 w-full rounded-t-md ${
            topHalf.isOver && "border-t-2 border-t-purple-500"
          }`}
        ></div>
  
        <div
          ref={bottomHalf.setNodeRef}
          className={`h-1/2 absolute bottom-0 left-0 w-full rounded-b-md ${
            bottomHalf.isOver && "border-b-2 border-b-purple-500"
          }`}
        ></div>
  
        <div className={`opacity-100 ${isMouseOver && "opacity-25"}`}>
          <BuilderComponent elementInstance={element} />
        </div>
  
        {isMouseOver && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p>Click to set form details</p>
            </div>
            <div className="absolute right-0 h-full flex justify-center items-center">
              <button
                className="bg-purple-300 h-full text-white p-2 rounded-md flex justify-center items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteElement(element.id);
                }}
              >
                delete
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

export default BuilderElemetWrapper; 