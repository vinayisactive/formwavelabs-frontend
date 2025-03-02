import FormBuilder from '@/components/section/form-builder';
import ElementsContextProvider from '@/context/elements-context';
import React from 'react'

const page = async({params}: { params: Promise<{wsId: string; formId: string}>}) => {
  const {formId, wsId} = (await params)
   
  return (
    <ElementsContextProvider>
      <div className='w-screen h-screen absolute top-0 left-0'>
         <FormBuilder formId={formId} workspaceId={wsId} />
      </div>
    </ElementsContextProvider>
  )
}

export default page
