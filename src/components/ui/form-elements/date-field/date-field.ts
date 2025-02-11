import { ElementsType, FormElement } from "@/utility/ts-types";
import { dateFieldExtraAttributes as extraAttributes } from "./date-prop-attributes";
import DateFieldTile from "./date-field-tile";
import DateSetting from "./date-field-setting";
import DateFieldSubmit from "./date-field-submit";


const type: ElementsType = "DateField";

const DateFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  tile: DateFieldTile,
  setting: DateSetting,
  submit: DateFieldSubmit,

  elementButton: "DateField"
};

export default DateFieldFormElement;
