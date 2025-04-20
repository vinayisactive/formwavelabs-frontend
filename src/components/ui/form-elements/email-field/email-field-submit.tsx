import { FC, useState } from "react";
import { SubmitComponentWrapper } from "../elements-reusable-comp";
import { submitCompPropsType } from "@/utility/ts-types";
import { EmailCustomInstance } from "./email-prop-attributes";

const EmailSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  elementsToValidate,
  setElementsToValidate,
  handleValues,
  formValues,
  isFormError,
}) => {
  const { id, extraAttributes } = elementInstance as EmailCustomInstance;
  const { label, helperText, required, placeHolder } = extraAttributes;

  const [inputValue, setInputValue] = useState<string>(
    formValues?.[id]?.value || ""
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (value: string) => {
    setInputValue(value);
  
    setElementsToValidate?.((prev) => ({
      ...prev,
      [id]: validateEmail(value) ? undefined : "",
    }));
    
    handleValues?.(id, {id, value, label: extraAttributes.label});
  };

  return (
    <SubmitComponentWrapper
      id={id}
      label={label}
      helperText={helperText}
      required={required}
      currentElementToValidate={elementsToValidate?.[id]}
      isFormError={isFormError}
      errorLable="Either empty or invalid"
    >

      <input
        type="text"
        id={id}
        placeholder={placeHolder}
        required={required}
        value={formValues?.[id]?.value || inputValue}
        onChange={(event) => handleChange(event.target.value)}
        className="w-full pb-1 border-b-2 border-gray-300 focus:outline-none text-sm mt-1 focus:border-black"
      />
    </SubmitComponentWrapper>
  );
};

export default EmailSubmit;
