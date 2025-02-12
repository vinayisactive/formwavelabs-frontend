import { FormElemetInstance } from "@/utility/ts-types";

export const emailExtraAttributes = {
    label: "Email label",
    helperText: "helper text",
    placeHolder: "@mail...",
    required: false
}; 

export type EmailCustomInstance = FormElemetInstance & {
    extraAttributes: typeof emailExtraAttributes
};