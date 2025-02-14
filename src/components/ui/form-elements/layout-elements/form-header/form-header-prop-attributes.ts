import { FormElemetInstance } from "@/utility/ts-types";

type availableFontSizes = "sm" | "lg" | "xl" | "2xl" | "3xl";
type availablePositions = "left" | "center"; 
type avaibaleFontWeight = "normal" | "semibold" | "bold";

type formHeaderExtraAttributesType = {
    formHeader: string; 
    fontSize: availableFontSizes[];
    fontWeight: avaibaleFontWeight[];
    position: availablePositions[];
    selectedFontSizeForDesktop: availableFontSizes; 
    selectedFontSizeForMobile: availableFontSizes;
    selectedFontWeight: avaibaleFontWeight;
    selectedPosition: availablePositions; 
}

export const formHeaderExtraAttributes: formHeaderExtraAttributesType = {
    formHeader: "Form Header",
    fontSize: [ "sm", "lg","xl", "2xl", "3xl"],
    fontWeight: ["normal", "semibold", "bold"],
    position: ["center", "left"],
    selectedFontSizeForDesktop: "xl",
    selectedFontSizeForMobile: "lg",
    selectedFontWeight: "normal",
    selectedPosition: "left"  
}; 

export type FormHeaderCustomInstance = FormElemetInstance & {
    extraAttributes: formHeaderExtraAttributesType
}