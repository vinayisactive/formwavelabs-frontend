"use client"

import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core"
import BuilderSidebar from "./builder-siderbar";
import DndOverlayWrapper from "./dnd-overlay";


const BuilderSidebarDnd = () => {

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
        <BuilderSidebar />
        <DndOverlayWrapper />
    </DndContext>  
  )
}

export default BuilderSidebarDnd
