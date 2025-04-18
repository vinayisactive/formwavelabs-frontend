import { FormFieldsElementsType, FormElement } from "@/utility/ts-types";
import { textAreaExtraAttributes as extraAttributes } from "./text-area-prop-attributes";
import TextAreaTile from "./text-area-field-tile";
import TextAreaSetting from "./text-area-field-setting";
import TextAreaSubmit from "./text-area-field-submit";

const type: FormFieldsElementsType = "Text-Area-Field";

const TextAreaFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  tile: TextAreaTile,
  setting: TextAreaSetting,
  submit: TextAreaSubmit,

  elementButton: "Text Area"
};

export default TextAreaFormElement; 