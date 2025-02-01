import { FormElemetInstance } from "@/utility/ts-types";

interface selectExtraAttributesInterface{
    label: string,
    helperText?: string
    selectPlaceHolder: string
    required: boolean
    options: string[]
}

export const selectExtraAttributes = {
    label : "label",
    helperText: "helper text",
    selectPlaceHolder: "Select an option",
    required: false, 
    options: []
}; 

export type selectFieldCustomInstance = FormElemetInstance & {
    extraAttributes : selectExtraAttributesInterface
}; 