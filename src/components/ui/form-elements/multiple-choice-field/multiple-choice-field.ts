import { ElementsType, FormElement } from "@/utility/ts-types";
import { multipleChoiceFieldExtraAttributes as extraAttributes } from "./multiple-choice-prop-attributes";
import MultipleChoicePropertiesComponent from "./multiple-choice-field-property";
import MultipleChoiceFieldBuilderComp from "./multiple-choice-field-builder";
import MultipleChoiceFieldSubmitComp from "./multiple-choice-field-submit";

const type : ElementsType =  "MultipleChoiceField"; 

const MultipleChoiceFieldFormElement : FormElement = {
    type, 

    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),

    propertiesComponent : MultipleChoicePropertiesComponent,
    builderComponent: MultipleChoiceFieldBuilderComp,
    submitComponent: MultipleChoiceFieldSubmitComp,

    elementButton: {
        label : "MultipleChoiceField"
    }
    
}

export default MultipleChoiceFieldFormElement; 