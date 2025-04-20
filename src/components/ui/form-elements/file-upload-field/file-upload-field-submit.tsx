"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { FileUploadCustomInstance } from "./file-upload-prop-attributes";
import { SubmitComponentWrapper } from "../elements-reusable-comp";
import FileUploader from "../../file-uploader";
import { X, File } from "lucide-react";

const FileUploadSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  elementsToValidate,
  setElementsToValidate,
  handleValues,
  formValues,
  isFormError,
  formId,
}) => {
  const { id, extraAttributes } = elementInstance as FileUploadCustomInstance;
  const { label, helperText, required, selectedFileType } = extraAttributes;
  const [fileUrl, setFileUrl] = useState<string>(formValues?.[id]?.value || "");

  const handleChange = (url: string) => {
    setFileUrl(url);

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: url?.trim() === "" ? "" : undefined,
      }));
    }

    handleValues?.(id, { id, value: url, label: extraAttributes.label });
  };

  return (
    <SubmitComponentWrapper
      id={id}
      label={label}
      helperText={helperText}
      required={required}
      currentElementToValidate={elementsToValidate?.[id]}
      isFormError={isFormError}
    >
      {fileUrl ? (
        <div className=" text-black flex justify-start gap-2 items-center">
          <div className="flex justify-start gap-2   px-3 py-1 rounded-md items-center border-2 border-gray-300">
            <File size={15} />{" "}
            {fileUrl.length > 10 ? fileUrl.slice(0, 10) : fileUrl}...
          </div>

          <div
           className="text-black text-xs bg-gray-300 hover:bg-black hover:text-white px-2 py-2 rounded-md flex justify-start gap-2 items-center"
           onClick={() => handleChange("")}
           >
            <X size={15} />
          </div>
        </div>
      ) : (
        <FileUploader
          type="FORM"
          id={formId || ""}
          fileType={selectedFileType}
          onUploadComplete={(res) => handleChange(res.assetUrl)}
        />
      )}
    </SubmitComponentWrapper>
  );
};

export default FileUploadSubmit;
