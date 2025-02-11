import { FormElement, ElementsType } from "@/utility/ts-types";
import YesAndNoFieldTile from "./yes-n-no-field-tile";
import YesAndNoFieldSubmit from "./yes-n-no-field-submit";
import { yesAndNoFieldExtraAttributes as extraAttributes } from "./yes-n-no-prop-attributes";
import YesAndNoSetting from "./yes-n-no-field-setting";

const type: ElementsType = "YesAndNoField";

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

  elementButton: "YesAndNoField"
};

export default YesAndNoFormElement;
