import { TextFiledFormElement } from "@/components/ui/form-elements/text-field/text-field";
import { FormElemetsType } from "./ts-types";
import { SelectFieldFormElement } from "@/components/ui/form-elements/select-field/select-field";
import CheckBoxFieldElement from "@/components/ui/form-elements/checkbox-field/checkbox-field";
import RadioBtnFormElement from "@/components/ui/form-elements/radio-btn-field/radio-btn-field";
import TextAreaFormElement from "@/components/ui/form-elements/text-area-field/text-area-field";

export const FormElemets: FormElemetsType = {
    TextFiled: TextFiledFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField : CheckBoxFieldElement,
    RadioButtonField: RadioBtnFormElement,
    TextAreaField: TextAreaFormElement
  };

