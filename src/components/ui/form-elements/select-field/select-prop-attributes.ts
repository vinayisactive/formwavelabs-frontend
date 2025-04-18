import { FormElemetInstance } from "@/utility/ts-types";

interface selectExtraAttributesInterface{
    label: string,
    helperText?: string
    selectPlaceHolder: string
    required: boolean
    options: string[]
}

export const selectExtraAttributes = {
    label : "Dropdown label",
    helperText: "helper text",
    selectPlaceHolder: "Dropdown placeholder",
    required: false, 
    options: ["example"]
}; 

export type selectFieldCustomInstance = FormElemetInstance & {
    extraAttributes : selectExtraAttributesInterface
}; 