import { FormFieldsElementsType, FormElement } from "@/utility/ts-types";
import { multipleChoiceFieldExtraAttributes as extraAttributes } from "./multiple-choice-prop-attributes";
import MultipleChoiceFieldTile from "./multiple-choice-field-tile";
import MultipleChoiceSetting from "./multiple-choice-field-setting";
import MultipleChoiceSubmit from "./multiple-choice-field-submit";

const type : FormFieldsElementsType = "Multiple-Choice-Field"; 

const MultipleChoiceFieldFormElement : FormElement = {
    type, 

    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),

    tile: MultipleChoiceFieldTile,
    setting: MultipleChoiceSetting,
    submit: MultipleChoiceSubmit,

    elementButton: "Multi Selection"
    
}

export default MultipleChoiceFieldFormElement; 