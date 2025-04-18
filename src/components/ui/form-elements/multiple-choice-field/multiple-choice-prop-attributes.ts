import { FormElemetInstance } from "@/utility/ts-types";

interface multipleChoiceFieldExtraAttributesInteface {
    label : string; 
    helperText?: string | undefined; 
    required : boolean, 
    options: string[]
}

export const multipleChoiceFieldExtraAttributes = {
    label: "Multiple Choice label",
    helperText: "helper text...",
    required: false, 
    options: ["example one", "example two"]
}; 

export type MultipleChoiceFieldCustomInstance = FormElemetInstance & {
    extraAttributes : multipleChoiceFieldExtraAttributesInteface
}