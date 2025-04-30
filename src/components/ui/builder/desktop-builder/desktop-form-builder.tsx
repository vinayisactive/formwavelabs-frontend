import React from 'react'
import ElementsContainer from '../elements-container'
import DesktopBuilderPreview from './desktop-builder-preview'
import DndContextWrapper from '../../dnd-reusable/dnd-context-wrapper'
import TileContainer from '../tile-container'

const DesktopFormBuilder = ({theme} : {theme: "BOXY" | "ROUNDED" | undefined}) => {
  return (
    <div 
    className=" w-full h-full flex gap-2 justify-between">
    <aside className="w-1/5 overflow-y-scroll">
      <ElementsContainer />
    </aside>

    <div
      className=" w-full md:w-3/5 max-w-3xl rounded-tr-md  rounded-tl-md shadow-inner shadow-black/20"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23aaaaaa' fill-opacity='0.45' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundPosition: "center",
      }}
    >
      <DesktopBuilderPreview formTheme={theme} />
    </div>

    <aside className="w-1/5">
     <DndContextWrapper>
        <TileContainer />
      </DndContextWrapper>
    </aside>
  </div>
  )
}

export default DesktopFormBuilder; 
