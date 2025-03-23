"use client";

import { FormElemets } from "@/utility/static-data";
import { FormElemetInstance } from "@/utility/ts-types";
import useElements from "@/utility/useElements-hook";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

const DndDraggableButton = ({
  element,
  isElementTile,
}: {
  element: FormElemetInstance;
  isElementTile: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMouseOver, setMouseOver] = useState(false);
  const [isEditModeOn, setEditMode] = useState(false);
  const [isElementDragging, setIsElementDragging] = useState(false);

  const { setSelectedElementInstance, deleteElement, elements, addElement } =
    useElements();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const ChildElement = isElementTile
    ? FormElemets[element.type]?.tile
    : FormElemets[element.type].submit;

  const { setNodeRef: setTopRef, isOver: isTopOver } = useDroppable({
    id: `${element.id}-top`,
    data: {
      type: element.type,
      id: element.id,
      isTopHalf: true,
    },
  });

  const { setNodeRef: setBottomRef, isOver: isBottomOver } = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      type: element.type,
      id: element.id,
      isBottomHalf: true,
    },
  });

  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `${element.id}-drag-handler`,
    data: {
      type: element.type,
      id: element.id,
      isElementTile,
    },
  });

  useDndMonitor({
    onDragStart: () => {
      document.body.classList.add("dragging-active");
      setIsElementDragging(true);
    },
    onDragEnd: ({ active, over, delta }) => {
      setIsElementDragging(false);
      document.body.classList.remove("dragging-active");

      if (!active || !over) return;

      const isSignificantDrag = Math.hypot(delta.x, delta.y) > 10;
      if (!isSignificantDrag) return;

      const elementTileId = active.data.current?.id;
      const isTopHalf = over.data.current?.isTopHalf;
      const isBottomHalf = over.data.current?.isBottomHalf;

      if (elementTileId && (isTopHalf || isBottomHalf)) {
        const overIndex = elements.findIndex(
          (el) => el.id === over.data.current?.id
        );
        if (overIndex === -1) return;

        const activeIndex = elements.findIndex((el) => el.id === elementTileId);
        const elementToMove = { ...elements[activeIndex] };

        deleteElement(elementTileId);
        addElement(isTopHalf ? overIndex : overIndex + 1, elementToMove);
      }
    },
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .dragging-active * {
        -webkit-user-select: none !important;
        user-select: none !important;
        touch-action: none !important;
      }
      @media (pointer: coarse) {
        .dnd-element {
          touch-action: pan-y;
        }
        .dnd-element button {
          -webkit-tap-highlight-color: transparent;
          z-index: 20;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const handleEditMode = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isElementDragging) {
      setEditMode((prev) => !prev);
    }
  };

  if (!isMounted || isDragging) return null;

  return (
    <div
      ref={setNodeRef}
      {...(!isEditModeOn ? listeners : {})}
      {...attributes}
      className="dnd-element relative group bg-white backdrop-blur-md rounded-lg 
                transition-all cursor-pointer select-none"
      onMouseEnter={() => !isElementDragging && setMouseOver(true)}
      onMouseLeave={() => !isElementDragging && setMouseOver(false)}
      onClick={handleEditMode}
      onTouchEnd={handleEditMode}
    >
      <div
        ref={setTopRef}
        className={`absolute top-0 w-full h-1/2 rounded-t-lg 
          ${isTopOver ? "border-t-4 border-blue-400 z-10" : ""}`}
      />

      <div
        ref={setBottomRef}
        className={`absolute bottom-0 w-full h-1/2 rounded-b-lg 
          ${isBottomOver ? "border-b-4 border-blue-400 z-10" : ""}`}
      />

      <div
        className={`h-full transition-opacity ${
          isMouseOver ? "opacity-50" : "opacity-100"
        }`}
      >
        <ChildElement elementInstance={element} />
      </div>

      {isEditModeOn && (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-lg 
                        flex items-center justify-center gap-4">
          <div
            className="flex flex-col items-center gap-2 text-gray-600"
            onTouchStart={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSelectedElementInstance(element);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedElementInstance(element);
            }}
          >
            <Pencil className="w-6 h-6" />
          </div>

          <button
            className="p-1.5 hover:bg-red-100 rounded-md transition-colors"
            onTouchStart={(e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteElement(element.id);
              setSelectedElementInstance(null);
            }}
            onClick={(e) => {
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