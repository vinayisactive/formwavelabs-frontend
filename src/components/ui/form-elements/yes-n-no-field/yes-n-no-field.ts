import { FormElement, ElementsType } from "@/utility/ts-types";
import YesAndNoFieldBuilderComp from "./yes-n-no-field-builder";
import YesAndNoFieldSubmitComp from "./yes-n-no-field-submit";
import { yesAndNoFieldExtraAttributes as extraAttributes } from "./yes-n-no-prop-attributes";
import YesAndNoFieldPropertiesComp from "./yes-n-no-field-property";

const type: ElementsType = "YesAndNoField";

const YesAndNoFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  propertiesComponent:YesAndNoFieldPropertiesComp ,
  builderComponent: YesAndNoFieldBuilderComp,
  submitComponent: YesAndNoFieldSubmitComp,

  elementButton: {
    label: "YesAndNoField",
  },
};

export default YesAndNoFormElement;
