"use client";

import { submitCompPropsType } from "@/utility/ts-types";
import { FC } from "react";
import { FormHeaderCustomInstance } from "./form-header-prop-attributes";

const FormHeaderView: FC<submitCompPropsType> = ({ elementInstance }) => {
  const { extraAttributes } = elementInstance as FormHeaderCustomInstance;
  const {
    formHeader,
    selectedFontWeight,
    selectedPosition,
    selectedFontSizeForDesktop,
    selectedFontSizeForMobile,
  } = extraAttributes;

  const isCenter = selectedPosition === "center";
  const textAlignmentClass = isCenter ? "text-center" : "text-left";

  return (
    <div className="w-full px-2">
      {selectedFontSizeForMobile && (
        <div className={`w-full flex ${isCenter ? "justify-center" : ""}`}>
          <p className={`text-${selectedFontSizeForMobile} md:hidden font-${selectedFontWeight} ${textAlignmentClass} whitespace-pre-wrap`}>
            {formHeader}
          </p>
        </div>
      )}

      {selectedFontSizeForDesktop && (
        <div className={`w-full hidden md:flex ${isCenter ? "justify-center" : ""}`}>
          <p className={`text-${selectedFontSizeForDesktop} font-${selectedFontWeight} ${textAlignmentClass} whitespace-pre-wrap`}>
            {formHeader}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormHeaderView;
