import { PanelLeft } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import Workspaces from "./workspaces";

const WorkspaceSidebarMobile = ({
  setMobileSidebar,
  isMobileSidebarOpen,
  setCreateWorkspaceModal,
  wsId
}: {
  isMobileSidebarOpen: boolean;
  setMobileSidebar: Dispatch<SetStateAction<boolean>>;
  setCreateWorkspaceModal: Dispatch<SetStateAction<boolean>>; 
  wsId: string
}) => {
  return (
    <div className={`fixed inset-0 transition-opacity ${ isMobileSidebarOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"} md:hidden z-[90]`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${ isMobileSidebarOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileSidebar(false)}/>

      <div className={`absolute left-0 top-0 w-3/4 h-full bg-[#f1f1f1] shadow-xl transform transition-transform duration-300 ease-in-out ${ isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        <div className="flex justify-between items-center">
          <button onClick={() => setMobileSidebar(false)} className="p-2 hover:bg-gray-100 rounded-lg">
            <PanelLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-grow h-[95%]">
          <Workspaces setCreateWorkspaceModal={setCreateWorkspaceModal} wsId={wsId} />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebarMobile;
