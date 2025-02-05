import { ElementsType, FormElement } from "@/utility/ts-types";
import { dateFieldExtraAttributes as extraAttributes } from "./date-prop-attributes";
import DateFieldPropertyComp from "./date-field-property";
import DateFieldBuilderComp from "./date-field-builder";
import DateFieldSubmitComp from "./date-field-submit";

const type: ElementsType = "DateField";

const DateFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  propertiesComponent: DateFieldPropertyComp,
  builderComponent: DateFieldBuilderComp,
  submitComponent: DateFieldSubmitComp,

  elementButton: {
    label: "DateField",
  },
};

export default DateFieldFormElement;
