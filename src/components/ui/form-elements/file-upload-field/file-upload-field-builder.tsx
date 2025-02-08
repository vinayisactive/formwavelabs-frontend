import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { FileUploadCustomInstance } from "./file-upload-prop-attributes";
import { ImAttachment } from "react-icons/im";

const FileUploadFieldBuilderComp: FC<FormElementProps> = ({
  elementInstance,
}) => {
  const { extraAttributes } = elementInstance as FileUploadCustomInstance;
  const { label, helperText, required, selectedFileType } = extraAttributes;

  return (
    <div className="flex flex-col gap-1 justify-start items-start text-black">
      <p className="text-md">
        {label} <span>{required && "*"}</span>
      </p>
      <button className="flex items-center gap-2 border p-2 cursor-pointer text-sm">
        {selectedFileType} file <ImAttachment />
      </button>
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default FileUploadFieldBuilderComp;
