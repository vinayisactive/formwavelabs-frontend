import { FormElemetInstance } from "@/utility/ts-types";

export const checkBoxExtraAttributes = {
    label : "Checkbox label",
    helperText: "helper text...",
}; 

export type CheckboxCustomInstance = FormElemetInstance & {
    extraAttributes : typeof checkBoxExtraAttributes
}