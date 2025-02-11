import { ElementsType, FormElement } from "@/utility/ts-types";
import { checkBoxExtraAttributes as extraAttributes } from "./checkbox-prop-attributes";
import CheckBoxFieldTile from "./checkbox-field-tile";
import CheckBoxSetting from "./checkbox-field-setting";
import CheckBoxFieldSubmit from "./checkbox-field-submit";


const type: ElementsType = "CheckboxField";

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
  
  elementButton: "CheckboxField"
};

export default CheckBoxFieldElement;
