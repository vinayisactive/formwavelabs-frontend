import { FormElement, ElementsType } from "@/utility/ts-types";
import { RadioBtnExtraAttributes as extraAttributes } from "./radio-btn-prop-attributes";
import RadioBtnFieldTile from "./radio-btn-field-tile";
import RadioBtnSetting from "./radio-btn-field-setting";
import RadioBtnSubmit from "./radio-btn-field-submit";

const type: ElementsType = "RadioButtonField";

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

  elementButton: "RadioButtonField"
};

export default RadioBtnFormElement;
