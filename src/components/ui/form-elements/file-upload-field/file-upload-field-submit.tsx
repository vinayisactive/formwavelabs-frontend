"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { FileUploadCustomInstance } from "./file-upload-prop-attributes";
import { SubmitComponentWrapper } from "../property-reusable-comp";
import ImageKitFileUpload from "../../imagekit-file-uploader";
import { X } from "lucide-react";

const FileUploadFieldSubmitComp: FC<submitCompPropsType> = ({
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
    formValues?.current[id] || null
  );

  const saveHandler = (url: string) => {
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
    if (formValues) {
      formValues.current[id] = "";
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: formValues.current[id]?.trim() === "" ? "" : undefined,
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
          onSuccess={(res) => saveHandler(res.url)}
          className={
            theme === "BOXY"
              ? "border-r-4 border-b-4 border-black"
              : "rounded-md border-gray-300 border-2"
          }
        />
      )}

      {fileUrl && (
        <p className="border px-2 border-black flex justify-between items-center">
          {fileUrl}{" "}
          <span onClick={handleRemoveUrl}>
            <X />
          </span>
        </p>
      )}
    </SubmitComponentWrapper>
  );
};

export default FileUploadFieldSubmitComp;
