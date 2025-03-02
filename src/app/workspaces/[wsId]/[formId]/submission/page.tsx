import Submissions from '@/components/section/submissions';
import React from 'react'

const page = async({params}: {params: Promise<{wsId: string, formId : string}>}) => {
  const {formId, wsId} = await params; 

  return (
    <div className="w-screen h-screen absolute top-0 left-0 justify-start items-start bg-white">
       <Submissions formId={formId} workspaceId={wsId}/>
    </div>
  )
}

export default page 
