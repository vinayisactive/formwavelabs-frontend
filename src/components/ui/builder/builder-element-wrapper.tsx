"use client";

import { FormElemets } from "@/utility/static-data";
import { FormElemetInstance } from "@/utility/ts-types";
import useElements from "@/utility/useElements-hook";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

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
        className="group p-4 bg-white/80 backdrop-blur-md rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md  h-[120px] transition-all cursor-pointer"
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
          className={`absolute inset-0 top-0 left-0 w-full h-1/2 rounded-t-lg ${
            topHalf.isOver ? "bg-gray-100/50 border-t-4 border-gray-400" : ""
          }`}
        />
        
        <div
          ref={bottomHalf.setNodeRef}
          className={`absolute inset-0 bottom-0 left-0 w-full h-1/2 rounded-b-lg ${
            bottomHalf.isOver ? "bg-gray-100/50 border-b-4 border-gray-400" : ""
          }`}
        />
  
        <div className={`h-full transition-opacity ${isMouseOver ? "opacity-20" : "opacity-100"}`}>
          <BuilderComponent elementInstance={element} />
        </div>
  
        {isMouseOver && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-md rounded-lg flex items-center justify-center gap-4">
         
            <div className="flex flex-col items-center gap-2 text-gray-600">
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

export default BuilderElemetWrapper; 