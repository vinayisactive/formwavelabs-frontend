import { FormElemetInstance } from "@/utility/ts-types"

export type accecptedFiletype = "PDF"  | "IMAGE"; 

export type fileUploadExtraAttributesTypes = {
    label : string;
    helperText: string;
    required: boolean; 
    fileTypes: accecptedFiletype[]; 
    selectedFileType : accecptedFiletype; 
}

export const fileUploadExtraAttributes : fileUploadExtraAttributesTypes = {
    label: "file upload field label",
    helperText: "helperText",
    required: false,
    fileTypes: ["PDF", "IMAGE"],
    selectedFileType : "PDF"
}

export type FileUploadCustomInstance  = FormElemetInstance & {
    extraAttributes: fileUploadExtraAttributesTypes
};

