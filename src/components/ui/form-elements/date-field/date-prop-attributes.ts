import { FormElemetInstance } from "@/utility/ts-types";

export const dateFieldExtraAttributes = {
    label: "Date field label",
    helperText: "helper text",
    required: false
}; 

export type DateFieldCustomElement = FormElemetInstance & {
    extraAttributes: typeof dateFieldExtraAttributes
}; 