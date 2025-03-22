"use client";

import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { ReactNode } from "react";
import DndOverlayWrapper from "./dnd-overlay";

const DndContextWrapper = ({children}: {children: ReactNode}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensor = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensor}>
        {children}
      <DndOverlayWrapper />
    </DndContext>
  );
};

export default DndContextWrapper;
