import { FormElemetInstance } from "@/utility/ts-types";

interface multipleChoiceFieldExtraAttributesInteface {
    label : string; 
    helperText?: string | undefined; 
    required : boolean, 
    options: string[]
}

export const multipleChoiceFieldExtraAttributes = {
    label: "Multiple Choice label",
    helperText: "Check setting to edit",
    required: false, 
    options: ["Option1", "Option2"]
}; 

export type MultipleChoiceFieldCustomInstance = FormElemetInstance & {
    extraAttributes : multipleChoiceFieldExtraAttributesInteface
}