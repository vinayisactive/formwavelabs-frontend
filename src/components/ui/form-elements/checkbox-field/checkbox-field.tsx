import { ElementsType, FormElement } from "@/utility/ts-types";
import { checkBoxExtraAttributes as extraAttributes } from "./checkbox-prop-attributes";
import CheckBoxPropertiesComponent from "./checkbox-field-property";
import CheckBoxFieldSubmitComp from "./checkbox-field-submit";
import CheckBoxFieldBuilderComp from "./checkbox-field-builder";

const type: ElementsType = "CheckboxField";

const CheckBoxFieldElement: FormElement = {
  type,

  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  builderComponent: CheckBoxFieldBuilderComp,
  submitComponent: CheckBoxFieldSubmitComp,
  propertiesComponent: CheckBoxPropertiesComponent,
  
  elementButton: {
    label: "CheckboxField",
  },
};

export default CheckBoxFieldElement;
