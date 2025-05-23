import { FormElementProps } from "@/utility/ts-types";
import { FC } from "react";
import { LayoutImageCustomInstance } from "./layout-image-prop-attributes";
import Image from "next/image";

const mobileHeightClasses: Record<string, string> = {
  small: "h-[100px]",
  medium: "h-[120px]",
  large: "h-[150px]",
};

const desktopHeightClasses: Record<string, string> = {
  small: "md:h-[140px]",
  medium: "md:h-[180px]",
  large: "md:h-[220px]",
};

const LayoutImageView: FC<FormElementProps> = ({ elementInstance }) => {
  const { extraAttributes } = elementInstance as LayoutImageCustomInstance;
  const selected = extraAttributes.selectedHeight;

  return (
    <div
      className={` w-full relative border-purple-500 ${mobileHeightClasses[selected]} ${desktopHeightClasses[selected]}`}
    >
      {extraAttributes.url ? (
        <div className="">
          <Image
            src={extraAttributes.url}
            alt="Uploaded image"
            fill
            className="object-cover rounded-md"
            priority
            sizes="full"
          />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center bg-gray-100 rounded-md">
          Upload image in workspace assets
        </div>
      )}
    </div>
  );
};

export default LayoutImageView;
