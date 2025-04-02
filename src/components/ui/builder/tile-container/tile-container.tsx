"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import DndDraggableButton from "../../dnd-reusable/dnd-draggable-button";
import useElements from "@/utility/useElements-hook";

const TileContainer = ({closeLayer} : {closeLayer? : Dispatch<SetStateAction<boolean>>}) => {
  const { elements } = useElements();  
  const reOrderContainerRef = useRef<HTMLDivElement | null>(null); 
  const initialElementsLength = useRef(elements.length);

  useEffect(() => {
    if (reOrderContainerRef.current && elements.length > initialElementsLength.current) {
      setTimeout(() => {
        if (reOrderContainerRef.current) {
          reOrderContainerRef.current.scrollTop = reOrderContainerRef.current.scrollHeight;
        }
      }, 0);
    }
  
    initialElementsLength.current = elements.length;
  }, [elements.length]);

  return (
    <div className="h-full w-full flex flex-col bg-background overflow-hidden">
      <div className="w-full p-1 bg-muted/50">
        <p className="font-bold text-sm whitespace-nowrap">Drag to Re-order / Edit</p>
      </div>

      <div className={`flex-1 overflow-y-scroll p-2 space-y-2 rounded-md`} ref={reOrderContainerRef} >
        {elements.length === 0 ? (
          <AddElementsLabel />
        ) : (
          elements.map((el) => <DndDraggableButton key={el.id} element={el} isElementTile={true} closeLayer={closeLayer}/>)
        )}
      </div>
    </div>
  );
};

const AddElementsLabel = () => (
  <div className="h-full flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
    Add elements and drag to reorder them
  </div>
);

export default TileContainer;
