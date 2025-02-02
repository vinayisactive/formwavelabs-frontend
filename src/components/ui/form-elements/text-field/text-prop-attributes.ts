import { FormElemetInstance } from "@/utility/ts-types";

export const textExtraAttributes = {
    label: "Text label",
    helperText: "check setting to edit",
    required: false,
    placeholder: "type here...",
  };

  export type TextCustomInstance = FormElemetInstance & {
    extraAttributes: typeof textExtraAttributes;
};


