"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { FileUploadCustomInstance } from "./file-upload-prop-attributes";
import { SubmitComponentWrapper } from "../elements-reusable-comp";
// import ImageKitFileUpload from "../../imagekit-file-uploader";
import { Loader, X } from "lucide-react";
import { handleAxiosError } from "@/utility/axios-err-handler";
import axios from "axios";
import FileUploader from "../../file-uploader";

const FileUploadSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  elementsToValidate,
  setElementsToValidate,
  handleValues,
  formValues,
  isFormError,
  formId
}) => {
  const { id, extraAttributes } = elementInstance as FileUploadCustomInstance;
  const { label, helperText, required, selectedFileType } = extraAttributes;
  const [fileUrl, setFileUrl] = useState<string | null>(formValues?.[id] || null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleRemoveUrl = async () => {
    const [, fileId] = fileUrl?.split("::") as [string, string];

    try {
      setErrorMsg(null);
      setIsLoading(true);

      await axios.delete("/api/imagekit-auth", {
        data: {
          fileId,
        },
      });

      setIsLoading(false);
      setFileUrl(null);
      handleValues?.(id, "");
    } catch (error) {
      setErrorMsg(handleAxiosError(error));
      setIsLoading(false);
    }

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: "",
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
        <FileUploader
          type="FORM"
          id={formId || ""}
          fileType={selectedFileType}
          onUploadComplete={(res) => handleChange(res.assetUrl)}
        />
      )}

      {fileUrl && (
        <p className="border px-2 border-black flex justify-between items-center overflow-hidden">
          {fileUrl?.split("::")[0]}
          <span onClick={handleRemoveUrl}>
           { isLoading ? <Loader className="animate-spin"/> :  <X />}
          </span>
        </p>
      )}

      {errorMsg && <p>{errorMsg}</p>}
    </SubmitComponentWrapper>
  );
};

export default FileUploadSubmit;
