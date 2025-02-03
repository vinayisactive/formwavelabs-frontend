import { FormElemetInstance } from "@/utility/ts-types";

interface yesAndNoFieldExtraAttributesType {
    label : string; 
    helperText?: string | undefined; 
    required : boolean, 
    options: string[]
}

export const yesAndNoFieldExtraAttributes = {
    label: "Yes and No label",
    helperText: "Check setting to edit",
    required: false, 
    options: ["Yes", "No"]
}; 

export type YesAndNoFieldCustomInstance = FormElemetInstance & {
    extraAttributes : yesAndNoFieldExtraAttributesType
}