"use client";

import ElementTileWrapper from "./element-tile-wrapper";
import useElements from "@/utility/useElements-hook";

const ElementTileReOrder = () => {
  const { elements } = useElements();  

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden ml-2">
      <div className="w-full p-2 bg-muted/50">
        <p className="font-bold text-sm whitespace-nowrap">Drag to Re-order / Edit</p>
      </div>

      <div
        className={`flex-1 overflow-y-auto p-2 space-y-2 border rounded-md bg-accent/10`}
      >
        {elements.length === 0 ? (
          <AddElementsLabel />
        ) : (
          elements.map((el) => <ElementTileWrapper key={el.id} element={el} />)
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

export default ElementTileReOrder;
