import { ElementsType, FormElemet } from "@/utility/ts-types";
import TextBuilderComp from "./text-field-builder";
import { textExtraAttributes as extraAttributes } from "./text-prop-attributes";
import TextFieldSubmitComp from "./text-field-submit";
import TextPropertiesComponent from "./text-field-property";

const type: ElementsType = "TextFiled";

export const TextFiledFormElement: FormElemet = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  builderComponent: TextBuilderComp,
  submitComponent: TextFieldSubmitComp,
  propertiesComponent: TextPropertiesComponent,

  elementButton: {
    label: "TextField",
  },
};
