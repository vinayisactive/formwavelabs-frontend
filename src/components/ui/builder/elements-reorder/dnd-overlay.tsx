"use client";

import { FormElemets } from "@/utility/static-data";
import useElements from "@/utility/useElements-hook";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";

const DndOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>();

  const {elements} = useElements();

  useDndMonitor({
    onDragStart(event) {
      setDraggedItem(event.active);
    },

    onDragCancel() {
      setDraggedItem(null);
    },

    onDragEnd() {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) {
    return null;
  }

  let node;
  const elementTile = draggedItem?.data?.current?.isElementTile;

  if (elementTile) {
    const elementId = draggedItem?.data?.current?.id;
    const element = elements.find((el) => el.id === elementId);

    if (!element) {
      node = <div>No element found</div>;
    } else {
      const ElementTileComponent = FormElemets[element.type].tile;
      node = (
        <div className="bg-white p-2 rounded-md opacity-70 pointer-events-none border-2 border-black">
          <ElementTileComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DndOverlayWrapper;