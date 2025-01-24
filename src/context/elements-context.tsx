"use client"

import { FormElemetInstance } from "@/utility/ts-types";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type ElementsContextType = {
    elements : FormElemetInstance[]; 
    addElement: (index: number, element: FormElemetInstance) => void; 
    updateElementInstance: (id: string, updatedElement: FormElemetInstance) => void; 
    deleteElement: (id: string) => void; 
    selectedElementInstance: FormElemetInstance | null; 
    setSelectedElementInstance: Dispatch<SetStateAction<FormElemetInstance | null>>; 
    setElements: Dispatch<SetStateAction<FormElemetInstance[] | []>>
}
export const ElementsContext = createContext<ElementsContextType | null>(null);

const ElementsContextProvider = ({children}: {children: ReactNode}) => {
    const [elements, setElements] = useState<FormElemetInstance[]>([]); 
    const [selectedElementInstance, setSelectedElementInstance] = useState<FormElemetInstance | null>(null)

    const addElement = (index: number, element : FormElemetInstance) => {
       setElements(prev => {
            const elements = prev ? [...prev] : [] 
            elements.splice(index, 0, element); 
            return elements; 
        }); 
    }; 

    const deleteElement = (id: string) => {
      setElements((prev) => prev.filter((el) =>el.id !== id)); 
    }; 


    const updateElementInstance = (id: string, updatedElement: FormElemetInstance) => {
        setElements((prev) => 
            prev.map((element) => {
                return element.id === id ? { ...element, ...updatedElement } : element;
            })
        );
    };  

      
    return (
        <ElementsContext.Provider value={{elements, addElement, deleteElement, selectedElementInstance,  setSelectedElementInstance, updateElementInstance, setElements}}>
            {children}
        </ElementsContext.Provider>
    )
}; 

export default ElementsContextProvider; 