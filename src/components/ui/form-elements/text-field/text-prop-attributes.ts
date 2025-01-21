import { FormElemetInstance } from "@/utility/ts-types";

export const textExtraAttributes = {
    label: "Text field",
    helperText: "helper text",
    required: false,
    placeholder: "type here...",
  };

  export type TextCustomInstance = FormElemetInstance & {
    extraAttributes: typeof textExtraAttributes;
};


