import { FormElement, ElementsType } from "@/utility/ts-types";
import RadioBtnFieldSubmitComp from "./radio-btn-field-submit";
import RadioBtnFieldBuilderComp from "./radio-btn-field-builder";
import RadioBtnFieldPropertiesComp from "./radio-btn-field-property";
import { RadioBtnExtraAttributes as extraAttributes } from "./radio-btn-prop-attributes";

const type: ElementsType = "RadioButtonField";

const RadioBtnFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  propertiesComponent: RadioBtnFieldPropertiesComp,
  builderComponent: RadioBtnFieldBuilderComp,
  submitComponent: RadioBtnFieldSubmitComp,

  elementButton: {
    label: "RadioButtonField",
  },
};

export default RadioBtnFormElement;
