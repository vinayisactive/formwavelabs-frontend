import Submission from '@/components/section/submission';
import ElementsContextProvider from '@/context/elements-context';
import React from 'react'

const page = async({params}: {params: Promise<{formId: string}>}) => {
  const formId = (await params).formId; 

  // console.log(`From id from submission : ${formId}`);

  return (
    <ElementsContextProvider>
      <div className='w-screen h-screen pt-14'>
      <Submission formId = {formId}/>
      </div>
    </ElementsContextProvider>
  )
}

export default page; 
