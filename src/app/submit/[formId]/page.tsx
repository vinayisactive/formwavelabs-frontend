import Submit from '@/components/section/submit';
import ElementsContextProvider from '@/context/elements-context';
import React from 'react'

const page = async({params}: {params: Promise<{formId: string}>}) => {
  const formId = (await params).formId; 

  return (
    <ElementsContextProvider>
      <div className='w-screen h-screen pt-14 bg-white'>
         <Submit formId = {formId}/>
      </div>
    </ElementsContextProvider>
  )
}

export default page; 
