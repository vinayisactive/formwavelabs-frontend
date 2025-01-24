import ElementsContextProvider from '@/context/elements-context'
import React from 'react'
import FormBuilder from './form-builder'

const FormBuilderWrapper = ({ formId, page }: { formId: string; page: number }) => {
  return (
    <ElementsContextProvider>
        <FormBuilder formId={formId} page={page}/>
    </ElementsContextProvider>
  )
}

export default FormBuilderWrapper
