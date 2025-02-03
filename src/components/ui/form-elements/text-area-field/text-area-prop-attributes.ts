import { FormElemetInstance } from "@/utility/ts-types";

export const textAreaExtraAttributes = {
    label: "TextArea label",
    helperText: "check setting to edit",
    required: false,
    placeholder: "type here...",
  };

  export type TextAreaCustomInstance = FormElemetInstance & {
    extraAttributes: typeof textAreaExtraAttributes;
};


