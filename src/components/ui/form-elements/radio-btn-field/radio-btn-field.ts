import { FormElement, FormFieldsElementsType } from "@/utility/ts-types";
import { RadioBtnExtraAttributes as extraAttributes } from "./radio-btn-prop-attributes";
import RadioBtnFieldTile from "./radio-btn-field-tile";
import RadioBtnSetting from "./radio-btn-field-setting";
import RadioBtnSubmit from "./radio-btn-field-submit";

const type: FormFieldsElementsType = "RadioButton-Field";

const RadioBtnFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  tile: RadioBtnFieldTile,
  setting: RadioBtnSetting,
  submit: RadioBtnSubmit,

  elementButton: "Single Selection"
};

export default RadioBtnFormElement;
