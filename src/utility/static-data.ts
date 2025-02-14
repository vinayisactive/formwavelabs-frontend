import { TextFiledFormElement } from "@/components/ui/form-elements/text-field/text-field";
import { FormElemetsType } from "./ts-types";
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
    TextField: TextFiledFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField : CheckBoxFieldElement,
    RadioButtonField: RadioBtnFormElement,
    TextAreaField: TextAreaFormElement, 
    YesAndNoField: YesAndNoFormElement,
    MultipleChoiceField: MultipleChoiceFieldFormElement,
    DateField: DateFieldFormElement,
    FileUploadField: FileUploadFieldFormElement,
    EmailField: EmailFieldFormElement,
    FormHeader: FormHeaderLayoutElement,
    LayoutImage: LayoutImageFormElement
  };

