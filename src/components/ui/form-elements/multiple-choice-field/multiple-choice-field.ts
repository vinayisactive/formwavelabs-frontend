import { ElementsType, FormElement } from "@/utility/ts-types";
import { multipleChoiceFieldExtraAttributes as extraAttributes } from "./multiple-choice-prop-attributes";
import MultipleChoiceFieldTile from "./multiple-choice-field-tile";
import MultipleChoiceSetting from "./multiple-choice-field-setting";
import MultipleChoiceSubmit from "./multiple-choice-field-submit";


const type : ElementsType =  "MultipleChoiceField"; 

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

    elementButton: "MultipleChoiceField"
    
}

export default MultipleChoiceFieldFormElement; 