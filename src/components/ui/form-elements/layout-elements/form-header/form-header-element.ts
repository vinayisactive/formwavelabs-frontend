import { FormElement, LayoutElementsType } from "@/utility/ts-types";
import { formHeaderExtraAttributes as extraAttributes } from "./form-header-prop-attributes";
import FormHeaderTile from "./form-header-tile";
import FormHeaderSetting from "./form-header-setting";
import FormHeaderView from "./form-header-view";

const type : LayoutElementsType = "FormHeader"

const FormHeaderLayoutElement : FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    
    tile: FormHeaderTile,
    setting: FormHeaderSetting,
    submit: FormHeaderView,

    elementButton: "FormHeader"
}; 

export default FormHeaderLayoutElement; 
