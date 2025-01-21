import { TextFiledFormElement } from "@/components/ui/form-elements/text-field/text-field";
import { FormElemetsType, NavItemsInterface } from "./ts-types";

export const navItems : NavItemsInterface[] = [
    {
        label: "Home",
        routeTo: "/"
    },
    {
        label: "Create",
        routeTo: "/form"
    },
    {
        label: "Dashboard",
        routeTo: "/dashboard"
    },
    {
        label: "About",
        routeTo: "/about"
    }
]

export const FormElemets: FormElemetsType = {
    TextFiled: TextFiledFormElement,
  };

