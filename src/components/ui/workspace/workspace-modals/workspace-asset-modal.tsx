import React, { Dispatch, FC, SetStateAction } from 'react'
import WorkspaceAsset from '../workspace-asset'

interface WorkspaceAssetModalProps {
    workspaceName: string | undefined;  
    wsId: string; 
    setAssetModal: Dispatch<SetStateAction<boolean>>; 
}

const WorkspaceAssetModal: FC<WorkspaceAssetModalProps> = ({workspaceName, wsId, setAssetModal}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
    <div
      className="w-[90%] mx-auto h-full flex justify-center items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <WorkspaceAsset
        workspaceName={workspaceName}
        wsId={wsId}
        setAssetModal={setAssetModal}
      />
    </div>
  </div>
  )
}

export default WorkspaceAssetModal
