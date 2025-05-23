"use client";

import { useEffect, useRef } from "react";
import useElements from "@/utility/useElements-hook";
import useMediaQuery from "@/utility/useMediaQuery-hook";
import MobileDndDraggableButton from "../dnd-reusable/dnd-draggable-button-mobile";
import DndDraggableButton from "../dnd-reusable/dnd-draggable-button";

const TileContainer = () => {
  const { elements } = useElements();  
  const reOrderContainerRef = useRef<HTMLDivElement | null>(null); 
  const initialElementsLength = useRef(elements.length);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
        <p className="font-bold text-sm whitespace-nowrap pl-2">Drag to Re-order / Edit</p>
      </div>

      <div className={`flex-1 overflow-y-scroll p-2 space-y-2 rounded-md`} ref={reOrderContainerRef} >
        { elements.length === 0 ? (
          <AddElementsLabel />
        ) : (
          elements.map((el) => (
            isMobile ? <MobileDndDraggableButton key={el.id} element={el} isElementTile={true} /> :<DndDraggableButton key={el.id} element={el} isElementTile={true}/>
          )
        ))
      }
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