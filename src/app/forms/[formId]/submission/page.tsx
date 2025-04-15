import Submissions from '@/components/section/submissions';
import React from 'react'

const page = async({params}: {params: Promise<{formId : string}>}) => {
  const {formId} = await params; 

  return (
    <div className="w-screen h-screen absolute top-0 left-0 justify-start items-start bg-white">
       <Submissions formId={formId}/>
    </div>
  )
}

export default page 
