import { FormFieldsElementsType, FormElement } from "@/utility/ts-types";
import { checkBoxExtraAttributes as extraAttributes } from "./checkbox-prop-attributes";
import CheckBoxFieldTile from "./checkbox-field-tile";
import CheckBoxSetting from "./checkbox-field-setting";
import CheckBoxFieldSubmit from "./checkbox-field-submit";

const type: FormFieldsElementsType = "Checkbox-Field";

const CheckBoxFieldElement: FormElement = {
  type,

  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),

  tile: CheckBoxFieldTile,
  setting: CheckBoxSetting,
  submit: CheckBoxFieldSubmit,
  
  elementButton: "Check Box"
};

export default CheckBoxFieldElement;
