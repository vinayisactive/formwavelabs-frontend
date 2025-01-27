"use client"

import { SessionProvider } from 'next-auth/react';
import React from 'react'
import FormBuilder from './form-builder';


const SessionWrappedFormBuilder = ({ formId, page }: { formId: string; page: number }) => {
  return (
    <SessionProvider>
         <FormBuilder formId ={formId} page={page}/>
    </SessionProvider>
  )
}

export default SessionWrappedFormBuilder
