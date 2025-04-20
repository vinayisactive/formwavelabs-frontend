"use client";

import { submitCompPropsType } from "@/utility/ts-types";
import { FC } from "react";
import { FormHeaderCustomInstance } from "./form-header-prop-attributes";

const FormHeaderView: FC<submitCompPropsType> = ({ elementInstance }) => {
  const { extraAttributes } = elementInstance as FormHeaderCustomInstance;
  const {
    formHeader,
    selectedFontWeight,
    selectedDesktopPosition,
    selectedMobilePosition,
    selectedFontSizeForDesktop,
    selectedFontSizeForMobile,
  } = extraAttributes;

  const isMobileTextCenter = selectedMobilePosition === "center";
  const isDesktopTextCenter = selectedDesktopPosition === "center";
 
  const mobileTextAlignmentClass = isMobileTextCenter ? "text-center" : "text-left";
  const deskotpTextAlignmentClass = isDesktopTextCenter ? "text-center" : "text-left";

  return (
    <div className="w-full px-2">
      {selectedFontSizeForMobile && (
        <div className={`w-full flex ${isMobileTextCenter ? "justify-center" : ""}`}>
          <p className={`text-${selectedFontSizeForMobile} md:hidden font-${selectedFontWeight} ${mobileTextAlignmentClass} whitespace-pre-wrap`}>
            {formHeader}
          </p>
        </div>
      )}

      {selectedFontSizeForDesktop && (
        <div className={`w-full hidden md:flex ${isDesktopTextCenter ? "justify-center" : ""}`}>
          <p className={`text-${selectedFontSizeForDesktop} font-${selectedFontWeight} ${deskotpTextAlignmentClass} whitespace-pre-wrap`}>
            {formHeader}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormHeaderView;
