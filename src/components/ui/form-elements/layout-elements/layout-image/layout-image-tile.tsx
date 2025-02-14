import { FormElementProps } from "@/utility/ts-types";
import { FC } from "react";
import { ElementLayerTile } from "../../elements-reusable-comp";
import { LayoutImageCustomInstance } from "./layout-image-prop-attributes";

const LayoutImageTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { extraAttributes } = elementInstance as LayoutImageCustomInstance;
  return (
    <ElementLayerTile label={extraAttributes.label} typeLabel="Layout Image" />
  );
};

export default LayoutImageTile;
