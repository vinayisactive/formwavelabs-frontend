import { FormElement, FormFieldsElementsType } from "@/utility/ts-types";
import YesAndNoFieldTile from "./yes-n-no-field-tile";
import YesAndNoFieldSubmit from "./yes-n-no-field-submit";
import { yesAndNoFieldExtraAttributes as extraAttributes } from "./yes-n-no-prop-attributes";
import YesAndNoSetting from "./yes-n-no-field-setting";

const type: FormFieldsElementsType = "Yes-and-No-Field";

const YesAndNoFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  setting:YesAndNoSetting ,
  tile: YesAndNoFieldTile,
  submit: YesAndNoFieldSubmit,

  elementButton: "Yes / No"
};

export default YesAndNoFormElement;
