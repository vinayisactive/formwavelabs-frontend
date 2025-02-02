import { FormElemetInstance } from "@/utility/ts-types";

export const checkBoxExtraAttributes = {
    label : "Check box label",
    helperText: "Check setting to edit",
    required: false, 
}; 

export type CheckboxCustomInstance = FormElemetInstance & {
    extraAttributes : typeof checkBoxExtraAttributes
}