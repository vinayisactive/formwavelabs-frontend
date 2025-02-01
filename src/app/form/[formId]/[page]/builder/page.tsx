import FormBuilder from '@/components/section/form-builder';
import ElementsContextProvider from '@/context/elements-context';
import React from 'react'

const page = async({params}: { params: Promise<{formId: string, page: number}>}) => {
  const {formId, page} = (await params)
   
  return (
    <ElementsContextProvider>
      <div className='w-screen pt-12 overflow-x-hidden'>
         <FormBuilder formId ={formId} page={page}/>
      </div>
    </ElementsContextProvider>
  )
}

export default page
