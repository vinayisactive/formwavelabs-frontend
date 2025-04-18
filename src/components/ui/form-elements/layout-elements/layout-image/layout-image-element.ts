import { FormElement, LayoutElementsType } from "@/utility/ts-types";
import { layoutImageExtraAttributes as extraAttributes } from "./layout-image-prop-attributes";
import LayoutImageTile from "./layout-image-tile";
import LayoutImageSetting from "./layout-image-setting";
import LayoutImageView from "./layout-image-view";

const type: LayoutElementsType = "Layout-Image";

const LayoutImageFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  tile: LayoutImageTile,
  setting: LayoutImageSetting,
  submit: LayoutImageView,

  elementButton: "Layout Image",
};

export default LayoutImageFormElement;
