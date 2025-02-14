import FormBuilder from '@/components/section/form-builder';
import ElementsContextProvider from '@/context/elements-context';
import React from 'react'

const page = async({params}: { params: Promise<{formId: string}>}) => {
  const {formId} = (await params)
   
  return (
    <ElementsContextProvider>
      <div className='w-screen h-full'>
         <FormBuilder formId={formId} />
      </div>
    </ElementsContextProvider>
  )
}

export default page
