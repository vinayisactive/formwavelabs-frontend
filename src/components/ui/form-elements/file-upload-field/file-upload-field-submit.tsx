"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { FileUploadCustomInstance } from "./file-upload-prop-attributes";
import { RequiredFieldError } from "../property-reusable-comp";
import ImageKitFileUpload from "../../imagekit-file-uploader";
import { X } from "lucide-react";

const FileUploadFieldSubmitComp: FC<submitCompPropsType> = ({
  elementInstance,
  elementsToValidate,
  setElementsToValidate,
  handleValues,
  formValues,
  isFormError,
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
    setFileUrl(null)
    if(formValues){
      formValues.current[id] = ""
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: formValues.current[id]?.trim()  === "" ? "" : undefined
      }))
    }
  }; 

  return (
    <div className="flex flex-col gap-2 p-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {!fileUrl && (
        <ImageKitFileUpload
          fileType={selectedFileType}
          onSuccess={(res) => saveHandler(res.url)}
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

      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      {elementsToValidate?.[id] === "" && isFormError && <RequiredFieldError />}
    </div>
  );
};

export default FileUploadFieldSubmitComp;
