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
import useMediaQuery from "@/utility/useMediaQuery-hook";

const DndContextWrapper = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: isMobile ? 5 : 8,
    },
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: isMobile ? 200 : 350,
      tolerance: isMobile ? 15 : 30,
    },
  });

  const sensors = useSensors(
    mouseSensor, touchSensor, pointerSensor
  ); 

  return (
    <DndContext
      sensors={sensors}
      autoScroll={{
        enabled: true,
        threshold: {
          x: 0.1,
          y: isMobile ? 0.15 : 0.25,
        },
        acceleration: isMobile ? 7 : 5,
      }}
    >
      {children}
      <DndOverlayWrapper />
    </DndContext>
  );
};

export default DndContextWrapper;
