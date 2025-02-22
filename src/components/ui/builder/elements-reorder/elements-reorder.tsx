"use client";

import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import DndOverlayWrapper from "./dnd-overlay";
import TileContainer from "./tile-container";

const ElementsReOrder = () => {
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
      <TileContainer />
      <DndOverlayWrapper />
    </DndContext>
  );
};

export default ElementsReOrder;
