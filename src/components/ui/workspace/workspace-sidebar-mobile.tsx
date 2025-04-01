import { PanelLeft } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import Workspaces from './workspaces'

const WorkspaceSidebarMobile = ({isSidebarOpen, setIsSidebarOpen}: {
    isSidebarOpen: boolean,
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className={`fixed inset-0 transition-opacity ${ isSidebarOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none" } md:hidden`}>
     <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${ isSidebarOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsSidebarOpen(false)} />

     <div className={`absolute left-0 top-0 w-3/4 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${ isSidebarOpen ? "translate-x-0" : "-translate-x-full" }`}>
       <div className="p-4 border-b flex justify-between items-center h-[10%]">
         <h2 className="text-lg font-semibold">Workspace Menu</h2>
         <button  onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
           <PanelLeft className="h-5 w-5" />
         </button>
       </div>

       <div className="p-4 flex-grow h-[90%]"> 
        <Workspaces />
       </div>
     </div>
   </div>
  )
}

export default WorkspaceSidebarMobile
