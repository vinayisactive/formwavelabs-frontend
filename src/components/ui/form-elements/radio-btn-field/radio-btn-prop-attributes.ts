import { FormElemetInstance } from "@/utility/ts-types";

interface RadioButtonExtraAttributeType {
    label : string; 
    helperText?: string | undefined; 
    required : boolean, 
    options: string[]
}

export const RadioBtnExtraAttributes = {
    label: "Single select label",
    helperText: "helper text...",
    required: false, 
    options: ["example"]
}; 

export type RadioButtonCustomInstance = FormElemetInstance & {
    extraAttributes : RadioButtonExtraAttributeType
}