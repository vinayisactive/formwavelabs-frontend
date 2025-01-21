"use client"
import React, { useState } from 'react'
import Builder from '../ui/builder/builder';
import ElementsContextProvider from '@/context/elements-context';
import Preview from '../ui/preview/preview';
import BuilderNavbar from '../ui/nav/builder-navbar';

type TabType = "preview" | "builder";

const FormBuilder = ({formId}: {formId: string}) => {

    const [tab, setTab] = useState<TabType>("builder")

    console.log("inside formBuilder", formId);

    return (
        <ElementsContextProvider>
            <BuilderNavbar setTab={setTab}/>

            {tab === "builder" ? <Builder/> : <Preview/>}
      </ElementsContextProvider>
  )
}

export default FormBuilder; 
