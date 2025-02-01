import { ElementsType, FormElement } from "@/utility/ts-types";
import { selectExtraAttributes as extraAttributes } from "./select-prop-attributes";
import SelectFieldBuilderComp from "./select-field-builder";
import SelectPropertiesComponent from "./select-field-property";
import SelectFieldSubmitComp from "./select-field-submit";

const type: ElementsType = "SelectField";

export const SelectFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  builderComponent: SelectFieldBuilderComp,
  propertiesComponent: SelectPropertiesComponent, 
  submitComponent: SelectFieldSubmitComp,

  elementButton: {
    label: "SelectField",
  },
};
