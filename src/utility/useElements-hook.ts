"use client"

import { ElementsContext } from '@/context/elements-context';
import { useContext } from 'react'


const useElements = () => {
    const context = useContext(ElementsContext); 

    if(!context){
        throw new Error("useElements hook must be used within DesignerContext");
    }

  return context;
};

export default useElements;
