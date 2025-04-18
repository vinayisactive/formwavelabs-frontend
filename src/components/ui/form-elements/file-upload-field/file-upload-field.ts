import { FormFieldsElementsType, FormElement } from "@/utility/ts-types";
import { fileUploadExtraAttributes as extraAttributes } from "./file-upload-prop-attributes";
import FileUploadFieldTile from "./file-upload-field-tile";
import FileUploadSetting from "./file-upload-field-setting";
import FileUploadSubmit from "./file-upload-field-submit";

const type: FormFieldsElementsType  = "File-Upload-Field"

const FileUploadFieldFormElement : FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),

    tile: FileUploadFieldTile,
    setting: FileUploadSetting,
    submit: FileUploadSubmit,

    elementButton: "Upload File"
}

export default FileUploadFieldFormElement; 