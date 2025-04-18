import { FormElemetInstance } from "@/utility/ts-types";

export const checkBoxExtraAttributes = {
    label : "Checkbox label",
    helperText: "helper text...",
    required: false
}; 

export type CheckboxCustomInstance = FormElemetInstance & {
    extraAttributes : typeof checkBoxExtraAttributes
}