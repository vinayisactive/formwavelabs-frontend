import { submitCompPropsType } from "@/utility/ts-types";
import { DateFieldCustomElement } from "./date-prop-attributes";
import { FC, useState, useEffect } from "react";
import { RequiredFieldError } from "../property-reusable-comp";

const DateFieldSubmitComp: FC<submitCompPropsType> = ({
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
    formatDate(formValues?.current?.[element.id])
  );

  useEffect(() => {
    setInputDate(formatDate(formValues?.current?.[element.id]));
  }, [formValues, element.id]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;

    if (dateValue === "") {
      setInputDate("");
      handleValues?.(element.id, "");

      if (required) {
        setElementsToValidate?.((prev) => ({
          ...prev,
          [element.id]: "",
        }));
      }
    } else {
      const date = new Date(dateValue);
      setInputDate(dateValue);
      handleValues?.(element.id, date.toLocaleString());

      if (required) {
        setElementsToValidate?.((prev) => ({
          ...prev,
          [element.id]: undefined,
        }));
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 items-start text-black">
      <p className="text-md">
        {label} {required && "*"}
      </p>
      <input
        type="date"
        required={required}
        onChange={handleDateChange}
        value={inputDate}
      />
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      {elementsToValidate?.[element.id] === "" && isFormError && (
        <RequiredFieldError />
      )}
    </div>
  );
};

export default DateFieldSubmitComp;
