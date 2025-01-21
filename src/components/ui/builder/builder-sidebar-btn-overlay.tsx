import { FormElemet } from "@/utility/ts-types";

const SidebarBtnElementOverlay = ({
  FormElement,
}: {
  FormElement: FormElemet;
}) => {
  const label = FormElement.elementButton.label;

  return (
    <button
      className={`w-[100px] h-[100px] flex justify-center items-center border rounded-md cursor-grab bg-gray-300`}
    >
      {label}
    </button>
  );
};

export default SidebarBtnElementOverlay;
