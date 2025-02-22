import FormBuilder from '@/components/section/form-builder';
import ElementsContextProvider from '@/context/elements-context';
import React from 'react'

const page = async({params}: { params: Promise<{formId: string}>}) => {
  const {formId} = (await params)
   
  return (
    <ElementsContextProvider>
      <div className='w-screen h-screen absolute top-0 left-0'>
         <FormBuilder formId={formId} />
      </div>
    </ElementsContextProvider>
  )
}

export default page
