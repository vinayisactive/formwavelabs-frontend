import FormBuilder from '@/components/section/form-builder';
import React from 'react'

const page = async({params}: {params: Promise<{formId: string}>}) => {
  const formId = (await params).formId; 
   
  return (
    <div className='w-screen h-screen pt-12'>
      <FormBuilder formId ={formId}/>
    </div>

  )
}

export default page
