import { ElementsType, FormElement } from "@/utility/ts-types";
import TextFieldTile from "./text-field-tile";
import { textExtraAttributes as extraAttributes } from "./text-prop-attributes";
import TextFieldSubmit from "./text-field-submit";
import TextFieldSetting from "./text-field-setting";

const type: ElementsType = "TextField";

export const TextFiledFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  tile: TextFieldTile,
  setting: TextFieldSetting,
  submit: TextFieldSubmit,

  elementButton: "TextField"
};
