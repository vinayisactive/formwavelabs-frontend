import { FormElement } from "@/utility/ts-types"; 
import { IconMap } from "./builder-sidebar-btn";

const SidebarBtnElementOverlay = ({ FormElement }: { FormElement: FormElement }) => {
  const { label } = FormElement.elementButton;
  const Icon = IconMap[label];

  return (
    <button
      className={` min-w-[100px] p-3 flex items-center gap-2 border border-gray-200 rounded-lg 
        cursor-grab bg-white hover:bg-gray-50 transition-colors shadow-sm 
        hover:shadow-md w-full text-gray-700 text-sm`}
    >
      {Icon && <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />}
      <span className="text-left">{label}</span>
    </button>
  );
};

export default SidebarBtnElementOverlay;
