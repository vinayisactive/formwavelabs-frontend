"use client"
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"
import BuilderDropArea from "./builder-drop-area";
import DndOverlayWrapper from "./dnd-overlay";

const Builder = () => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
          distance: 10
        }
      })
    
      const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
          delay: 300,
          tolerance: 5
        }
      }); 
    
      const sensor = useSensors(mouseSensor, touchSensor); 
  return (
    <DndContext sensors={sensor}>
        <BuilderDropArea />
        <DndOverlayWrapper />
    </DndContext>  
  )
}

export default Builder
