import { ElementsType, FormElement } from "@/utility/ts-types";
import TextAreaBuilderComp from "./text-area-field-builder";
import TextAreaFieldSubmitComp from "./text-area-field-submit";
import TextAreaPropertiesComponent from "./text-area-field-property";
import { textAreaExtraAttributes as extraAttributes } from "./text-area-prop-attributes";

const type: ElementsType = "TextAreaField";

const TextAreaFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  builderComponent: TextAreaBuilderComp,
  submitComponent: TextAreaFieldSubmitComp,
  propertiesComponent: TextAreaPropertiesComponent,

  elementButton: {
    label: "TextAreaField",
  },
};

export default TextAreaFormElement; 