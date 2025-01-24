import FormBuilderWrapper from '@/components/section/form-builder-wrapper';
import React from 'react'

const page = async({params}: { params: Promise<{formId: string, page: number}>}) => {
  const {formId, page} = (await params)
   
  return (
    <div className='w-screen h-screen pt-12'>
      <FormBuilderWrapper formId ={formId} page={page}/>
    </div>

  )
}

export default page
