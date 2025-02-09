import Submissions from '@/components/section/submissions';
import React from 'react'

const page = async({params}: {params: Promise<{formId : string}>}) => {
  const formId = (await params).formId; 

  return (
    <div className="w-screen justify-start items-start">
       <Submissions formId={formId}/>
    </div>
  )
}

export default page
