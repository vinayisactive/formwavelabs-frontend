"use client"
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DndContextWrapper from "../../dnd-reusable/dnd-context-wrapper";
import MobileBuilderPreview from "./mobile-builder-preview";
import ElementsContainer from "../elements-container/elements-container";
import useElements from "@/utility/useElements-hook";

const MobileFormBuilder = ({theme} : {theme: "BOXY" | "ROUNDED" | undefined}) => {
  const [isAddElementModalOpen, setAddElementModal] = useState<boolean>(false);
  const { elements } = useElements()
  const previewContainerRef  = useRef<HTMLDivElement | null>(null)
  const prevElementLength = useRef<number>(elements.length)

  useEffect(() => {
        if (previewContainerRef.current && elements.length > prevElementLength.current) {
          setTimeout(() => {
            if(previewContainerRef.current){
              previewContainerRef.current.scrollTop = previewContainerRef.current.scrollHeight; 
            }
          }, 0);
        }
 
      prevElementLength.current = elements.length
  }, [elements.length])

  return (
    <DndContextWrapper> 
    <div
      className="w-full h-full flex flex-col justify-between gap-1 px-2 pt-1 border-2 pb-2 rounded-tr-md rounded-tl-md overflow-x-hidden"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23aaaaaa' fill-opacity='0.45' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundPosition: "center",
      }}
    >

      <div className="w-full justify-start items-center py-1">
        <button className="p-1 bg-white rounded-md shadow-sm shadow-black/50" onClick={() => setAddElementModal(true)}><Plus size={15} /></button>
      </div>

      <div className="w-full h-full overflow-y-scroll scroll-smooth" ref={previewContainerRef}>
        <MobileBuilderPreview theme={theme}/>
      </div>

    {
        isAddElementModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10] h-full flex justify-center items-center" onClick={() => setAddElementModal(false)}>
                    <div className="w-[80%] bg-white rounded-md p-2">
                      <ElementsContainer />
                    </div>
        
            </div>
        )
    }

    </div>
    </DndContextWrapper>
  );
};

export default MobileFormBuilder;
