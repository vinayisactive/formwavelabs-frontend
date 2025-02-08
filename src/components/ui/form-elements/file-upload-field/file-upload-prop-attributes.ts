import { FormElemetInstance } from "@/utility/ts-types"

export type accecptedFiletype = "pdf"  | "image" | "video";

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
    fileTypes: ["pdf", "image", "video"],
    selectedFileType : "pdf"
}

export type FileUploadCustomInstance  = FormElemetInstance & {
    extraAttributes: fileUploadExtraAttributesTypes
};

