import { FormElemetInstance } from "@/utility/ts-types";

export const textAreaExtraAttributes = {
    label: "Text-area label",
    helperText: "helper text...",
    required: false,
    placeholder: "placeholder...",
  };

  export type TextAreaCustomInstance = FormElemetInstance & {
    extraAttributes: typeof textAreaExtraAttributes;
};


