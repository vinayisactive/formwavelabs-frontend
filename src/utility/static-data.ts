import { TextFiledFormElement } from "@/components/ui/form-elements/text-field/text-field";
import { FormElemetsType, FormFieldsElementsType, LayoutElementsType } from "./ts-types";
import { SelectFieldFormElement } from "@/components/ui/form-elements/select-field/select-field";
import CheckBoxFieldElement from "@/components/ui/form-elements/checkbox-field/checkbox-field";
import RadioBtnFormElement from "@/components/ui/form-elements/radio-btn-field/radio-btn-field";
import TextAreaFormElement from "@/components/ui/form-elements/text-area-field/text-area-field";
import YesAndNoFormElement from "@/components/ui/form-elements/yes-n-no-field/yes-n-no-field";
import MultipleChoiceFieldFormElement from "@/components/ui/form-elements/multiple-choice-field/multiple-choice-field";
import DateFieldFormElement from "@/components/ui/form-elements/date-field/date-field";
import FileUploadFieldFormElement from "@/components/ui/form-elements/file-upload-field/file-upload-field";
import EmailFieldFormElement from "@/components/ui/form-elements/email-field/email-field";
import FormHeaderLayoutElement from "@/components/ui/form-elements/layout-elements/form-header/form-header-element";
import LayoutImageFormElement from "@/components/ui/form-elements/layout-elements/layout-image/layout-image-element";


export const FormElemets: FormElemetsType = {
    "Text-Field": TextFiledFormElement,
    "Select-Field": SelectFieldFormElement,
    "Checkbox-Field" : CheckBoxFieldElement,
    "RadioButton-Field": RadioBtnFormElement,
    "Text-Area-Field": TextAreaFormElement, 
    "Yes-and-No-Field": YesAndNoFormElement,
    "Multiple-Choice-Field": MultipleChoiceFieldFormElement,
    "Date-Field": DateFieldFormElement,
    "File-Upload-Field": FileUploadFieldFormElement,
    "Email-Field": EmailFieldFormElement,
    "Form-Header": FormHeaderLayoutElement,
    "Layout-Image": LayoutImageFormElement
  };

  export const FORM_ELEMENTS: (FormFieldsElementsType)[] = [
    "Text-Field",
    "Text-Area-Field",
    "Select-Field",
    "RadioButton-Field",
    "Multiple-Choice-Field",
    "Email-Field",
    "Yes-and-No-Field",
    "Checkbox-Field",
    "Date-Field",
    "File-Upload-Field",
  ];

  export const LAYOUT_ELEMENTS : (LayoutElementsType)[] = [
    "Form-Header",
    "Layout-Image"
  ]


