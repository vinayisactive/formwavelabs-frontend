import { FormElemetInstance } from "@/utility/ts-types";

type availableHeight = "small" | "medium" | "large"

type LayoutImageExtraAttributeType = {
    label: string;
    url: string;
    height: availableHeight[];
    selectedHeight: availableHeight;
}

export const layoutImageExtraAttributes : LayoutImageExtraAttributeType = {
    label: "Layout image label",
    url: "",
    height: ["small", "medium", "large"],
    selectedHeight : "medium"
}; 

export type LayoutImageCustomInstance = FormElemetInstance & {
    extraAttributes: LayoutImageExtraAttributeType
}; 

