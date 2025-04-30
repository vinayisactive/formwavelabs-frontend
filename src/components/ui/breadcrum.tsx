import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";

const Breadcrumb = ({ workspaceId, workspaceName, formTitle }: { 
  workspaceId: string | undefined;
  workspaceName: string | undefined;
  formTitle: string | undefined;
}) => (
  <div className="flex items-center text-xs text-black h-full border px-2 py-2 rounded-lg shadow-inner bg-white">
    <HiOutlineSquare3Stack3D className="mr-2" size={15} />
    <Link
      href={`/workspaces/${workspaceId}`}
      className="hover:text-gray-700 hover:underline text-xs font-bold"
    >
      {workspaceName || "Loading..."}
    </Link>
    <ChevronsRight className="mx-1" size={15} />
    <span className="text-gray-900 font-bold">
      {formTitle ? `${formTitle.slice(0, 15)}${formTitle.length > 15 ? "..." : ""}` : "Loading..."}
    </span>
  </div>
);

export default Breadcrumb;