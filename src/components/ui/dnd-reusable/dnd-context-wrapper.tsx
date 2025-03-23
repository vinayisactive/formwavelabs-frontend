"use client";

import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { ReactNode } from "react";
import DndOverlayWrapper from "./dnd-overlay";

const DndContextWrapper = ({children}: {children: ReactNode}) => {

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8
    },
  });
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 8,
    },
  });

  const sensor = useSensors(mouseSensor, touchSensor, pointerSensor);

  return (
    <DndContext sensors={sensor}>
        {children}
      <DndOverlayWrapper />
    </DndContext>
  );
};

export default DndContextWrapper;
