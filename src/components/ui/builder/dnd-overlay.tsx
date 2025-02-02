"use client";

import { FormElemets } from "@/utility/static-data";
import { ElementsType } from "@/utility/ts-types";
import useElements from "@/utility/useElements-hook";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import SidebarBtnElementOverlay from "./builder-sidebar/builder-sidebar-btn-overlay";


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
  const isDesignerBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;
  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;

  if (isDesignerBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = <SidebarBtnElementOverlay FormElement={FormElemets[type]} />;
  }

  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.id;
    const element = elements.find((el) => el.id === elementId);

    if (!element) {
      node = <div>No element found</div>;
    } else {
      const DesignerElementComponent = FormElemets[element.type].builderComponent;
      node = (
        <div className="bg-gray-600 p-3 rounded-md opacity-40 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DndOverlayWrapper;
