"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { FileUploadCustomInstance } from "./file-upload-prop-attributes";
import { SubmitComponentWrapper } from "../elements-reusable-comp";
import ImageKitFileUpload from "../../imagekit-file-uploader";
import { X } from "lucide-react";

const FileUploadSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  elementsToValidate,
  setElementsToValidate,
  handleValues,
  formValues,
  isFormError,
  theme,
}) => {
  const { id, extraAttributes } = elementInstance as FileUploadCustomInstance;
  const { label, helperText, required, selectedFileType } = extraAttributes;
  const [fileUrl, setFileUrl] = useState<string | null>(
    formValues?.[id] || null
  );

  const handleChange = (url: string) => {
    setFileUrl(url);

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: url?.trim() === "" ? "" : undefined,
      }));
    }

    handleValues?.(id, url);
  };

  const handleRemoveUrl = () => {
    setFileUrl(null);
    handleValues?.(id, "")

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: ""
      }));
    }
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
      {!fileUrl && (
        <ImageKitFileUpload
          fileType={selectedFileType}
          onSuccess={(res) => handleChange(res.url)}
          className={
            theme === "BOXY"
              ? "border-r-4 border-b-4 border-black"
              : "rounded-md border-gray-300 border-2"
          }
        />
      )}

      {fileUrl && (
        <p className="border px-2 border-black flex justify-between items-center overflow-hidden">
          {fileUrl}
          <span onClick={handleRemoveUrl}>
            <X />
          </span>
        </p>
      )}
    </SubmitComponentWrapper>
  );
};

export default FileUploadSubmit;
