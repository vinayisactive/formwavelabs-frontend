"use client";

import { FormElemets } from "@/utility/static-data";
import useElements from "@/utility/useElements-hook";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

const DndOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useElements();

  useDndMonitor({
    onDragStart: (event) => setDraggedItem(event.active),
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  const elementId = draggedItem.data?.current?.id;
  const element = elements.find(el => el.id === elementId);
  const isElementTile = draggedItem.data?.current?.isElementTile;

  if (!element) return <div className="text-red-500">Element not found</div>;

  const ComponentType = isElementTile ? 'tile' : 'submit';
  const ElementComponent = FormElemets[element.type]?.[ComponentType];

  return (
    <DragOverlay dropAnimation={{ duration: 250 }}>
      {ElementComponent ? (
        <div className="bg-white rounded-md shadow-xl border-2 border-blue-200 transform scale-105">
          <ElementComponent elementInstance={element} />
        </div>
      ) : (
        <div className="bg-yellow-100 p-2 rounded-md">Component missing</div>
      )}
    </DragOverlay>
  );
};

export default DndOverlayWrapper;