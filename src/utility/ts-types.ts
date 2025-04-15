import { Dispatch, SetStateAction } from "react";

export type ElementsType = "TextField" | "SelectField" | "CheckboxField" | "RadioButtonField"  | "TextAreaField" | "YesAndNoField" | "MultipleChoiceField" | "DateField" | "FileUploadField" | "EmailField"
export type LayoutElementsType = "FormHeader" | "LayoutImage"


export type FormElemetInstance = {
  id: string;
  type: ElementsType | LayoutElementsType; 
  extraAttributes?: Record<string, unknown>;
};

export type FormElement = {
  construct: (id: string) => FormElemetInstance;
  type: ElementsType | LayoutElementsType; 
  tile: React.FC<FormElementProps>;
  setting: React.FC<FormElementProps>;
  submit: React.FC<submitCompPropsType>;
  elementButton: string;
};

export interface FormElementProps {
  elementInstance: FormElemetInstance;
  workspaceId?: string
}

export type submitCompPropsType = {
    formId?: string
    elementInstance: FormElemetInstance;
    handleValues?: submitValueType;
    formValues?: { [key: string]: {id: string, value: string, label: string} };
    setFormValues?: Dispatch<SetStateAction<{ [key: string]: {id: string, value: string, label: string} }>>;
    elementsToValidate?: Record<string, string | undefined>; 
    setElementsToValidate?: Dispatch<SetStateAction<Record<string, string | undefined>>>
    isFormError?: boolean;
    theme? : "BOXY" | "ROUNDED" | undefined
}

export type submitValueType = (key: string, value: { id: string, value: string, label: string}) => void;

export type FormElemetsType = {
    [key in (ElementsType | LayoutElementsType)]: FormElement;
  };

