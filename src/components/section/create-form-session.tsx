"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CreateForm from './create-form'

const SessionWrappedCreateForm = () => {
  return (
    <SessionProvider>
      <CreateForm />
    </SessionProvider>
  )
}

export default SessionWrappedCreateForm
