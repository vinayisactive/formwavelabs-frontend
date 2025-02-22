"use client";

import TileWrapper from "./tile-wrapper";
import useElements from "@/utility/useElements-hook";

const TileContainer = () => {
  const { elements } = useElements();  

  return (
    <div className="h-full w-full flex flex-col bg-background overflow-hidden ">
      <div className="w-full p-1 bg-muted/50">
        <p className="font-bold text-sm whitespace-nowrap">Drag to Re-order / Edit</p>
      </div>

      <div className={`flex-1 overflow-y-auto p-2 space-y-2 rounded-md`}>
        {elements.length === 0 ? (
          <AddElementsLabel />
        ) : (
          elements.map((el) => <TileWrapper key={el.id} element={el} />)
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
