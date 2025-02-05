import { FormElemetInstance, submitValueType } from "@/utility/ts-types";
import { DateFieldCustomElement } from "./date-prop-attributes";
import { FC, useState, useEffect } from "react";

interface DateFieldSubmitCompProps {
  elementInstance: FormElemetInstance;
  handleValues?: submitValueType;
  formValues?: React.RefObject<{ [key: string]: string }>;
}

const DateFieldSubmitComp: FC<DateFieldSubmitCompProps> = ({
  elementInstance,
  handleValues,
  formValues,
}) => {
  const element = elementInstance as DateFieldCustomElement;
  const { label, helperText, required } = element.extraAttributes;

  const formatDate = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : null;
    return date && !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "";
  };

  const [inputDate, setInputDate] = useState(() => formatDate(formValues?.current?.[element.id]));

  useEffect(() => {
    setInputDate(formatDate(formValues?.current?.[element.id]));
  }, [formValues, element.id]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setInputDate(e.target.value);
    handleValues?.(element.id, date.toLocaleString());
  };

  return (
    <div className="flex flex-col gap-1 items-start text-black">
      <p className="text-md">
        {label} {required && "*"}
      </p>
      <input type="date" required={required} onChange={handleDateChange} value={inputDate} />
      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  );
};

export default DateFieldSubmitComp;

