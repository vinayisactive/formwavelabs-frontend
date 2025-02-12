import { ElementsType, FormElement } from "@/utility/ts-types";
import { emailExtraAttributes as extraAttributes } from "./email-prop-attributes";
import EmailFieldTile from "./email-field-tile";
import EmailSetting from "./email-field-setting";
import EmailSubmit from "./email-field-submit";

const type : ElementsType = "EmailField"

const EmailFieldFormElement : FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    
    tile: EmailFieldTile,
    setting: EmailSetting,
    submit: EmailSubmit,

    elementButton: "EmailField"
}

export default EmailFieldFormElement