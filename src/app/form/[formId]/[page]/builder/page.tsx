import SessionWrappedFormBuilder from '@/components/section/form-builder-session';
import ElementsContextProvider from '@/context/elements-context';
import React from 'react'

const page = async({params}: { params: Promise<{formId: string, page: number}>}) => {
  const {formId, page} = (await params)
   
  return (
    <ElementsContextProvider>
      <div className='w-screen h-screen pt-12'>
         <SessionWrappedFormBuilder formId ={formId} page={page}/>
      </div>
    </ElementsContextProvider>
  )
}

export default page
