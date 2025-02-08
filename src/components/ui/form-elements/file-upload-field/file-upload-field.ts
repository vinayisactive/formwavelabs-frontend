import { ElementsType, FormElement } from "@/utility/ts-types";
import { fileUploadExtraAttributes as extraAttributes } from "./file-upload-prop-attributes";
import FileUploadFieldPropertyComp from "./file-upload-field-property";
import FileUploadFieldBuilderComp from "./file-upload-field-builder";
import FileUploadFieldSubmitComp from "./file-upload-field-submit";

const type: ElementsType  = "FileUploadField"

const FileUploadFieldFormElement : FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    propertiesComponent:  FileUploadFieldPropertyComp,
    builderComponent: FileUploadFieldBuilderComp,
    submitComponent: FileUploadFieldSubmitComp,
    elementButton: {
        label: "FileUploadField"
    }
}

export default FileUploadFieldFormElement; 