import { submitCompPropsType } from "@/utility/ts-types";
import { DateFieldCustomElement } from "./date-prop-attributes";
import { FC, useState, useEffect } from "react";
import { SubmitComponentWrapper } from "../elements-reusable-comp";

const DateFieldSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
}) => {
  const element = elementInstance as DateFieldCustomElement;
  const { label, helperText, required } = element.extraAttributes;

  const formatDate = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : null;
    return date && !isNaN(date.getTime())
      ? date.toISOString().split("T")[0]
      : "";
  };

  const [inputDate, setInputDate] = useState(() =>
    formatDate(formValues?.[element.id]?.value)
  );

  useEffect(() => {
    setInputDate(formatDate(formValues?.[element.id]?.value));
  }, [formValues, element.id]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;

    if (dateValue === "") {
      setInputDate("");
      handleValues?.(element.id, {id: element.id, value: "", label});

      if (required) {
        setElementsToValidate?.((prev) => ({
          ...prev,
          [element.id]: "",
        }));
      }
    } else {
      const date = new Date(dateValue);
      setInputDate(dateValue);
      handleValues?.(element.id, {id: element.id, value: date.toLocaleString(), label});

      if (required) {
        setElementsToValidate?.((prev) => ({
          ...prev,
          [element.id]: undefined,
        }));
      }
    }
  };

  return (
    <SubmitComponentWrapper
      id={element.id}
      label={label}
      helperText={helperText}
      isFormError={isFormError}
      required={required}
      currentElementToValidate={elementsToValidate?.[element.id]}
    >
      <input
        type="date"
        required={required}
        onChange={handleDateChange}
        value={inputDate}
      />
    </SubmitComponentWrapper>
  );
};

export default DateFieldSubmit;
