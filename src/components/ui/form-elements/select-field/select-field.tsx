import { FormFieldsElementsType, FormElement } from "@/utility/ts-types";
import { selectExtraAttributes as extraAttributes } from "./select-prop-attributes";
import SelectSetting from "./select-field-setting";
import SelectFieldTile from "./select-field-tile";
import SelectSubmit from "./select-field-submit";

const type: FormFieldsElementsType = "Select-Field";

export const SelectFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  tile: SelectFieldTile,
  setting: SelectSetting,
  submit: SelectSubmit,

  elementButton: "Dropdown"
};
