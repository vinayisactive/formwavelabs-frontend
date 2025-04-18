import { Dispatch, SetStateAction } from "react";

export type FormFieldsElementsType = "Text-Field" | "Select-Field" | "Checkbox-Field" | "RadioButton-Field"  | "Text-Area-Field" | "Yes-and-No-Field" | "Multiple-Choice-Field" | "Date-Field" | "File-Upload-Field" | "Email-Field"
export type LayoutElementsType = "Form-Header" | "Layout-Image"


export type FormElemetInstance = {
  id: string;
  type: FormFieldsElementsType | LayoutElementsType; 
  extraAttributes?: Record<string, unknown>;
};

export type FormElement = {
  construct: (id: string) => FormElemetInstance;
  type: FormFieldsElementsType | LayoutElementsType; 
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
    [key in (FormFieldsElementsType | LayoutElementsType)]: FormElement;
  };

