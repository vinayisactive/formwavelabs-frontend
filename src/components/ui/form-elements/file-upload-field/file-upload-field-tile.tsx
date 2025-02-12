import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { FileUploadCustomInstance } from "./file-upload-prop-attributes";
import { ElementLayerTile } from "../elements-reusable-comp";

const FileUploadFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as FileUploadCustomInstance).extraAttributes;

  return <ElementLayerTile label={label} typeLabel="File Upload" />;
};

export default FileUploadFieldTile;