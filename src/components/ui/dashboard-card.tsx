import Link from "next/link";
import {
  CheckCircle2,
  Pencil,
  Trash2,
  BarChart,
  DraftingCompass,
} from "lucide-react";
import CopyToClipboard from "./copy-to-clipboard";

interface DashboardCard {
  id: string;
  title: string;
  description?: string;
  status: boolean;
}

const DashboardCard = ({ form }: { form: DashboardCard }) => {
  const copyToClipboardText = `https://formwavelabs-frontend.vercel.app/submit/${form.id}`;

  return (
    <div className="w-full md:w-1/3 h-[180px] group relative p-6 bg-white border md:border-b md:border-r  md:border-l-transparent md:border-t-transparent transition-colors duration-300 hover:bg-gray-50">
      <div className="absolute top-2 right-2">
        <div
          className={`px-2 py-1 rounded-sm text-xs font-medium flex items-center gap-1 ${
            form.status
              ? "bg-green-100 text-green-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {form.status ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <DraftingCompass className="w-3 h-3" />
          )}
          <span>{form.status ? "Live" : "Draft"}</span>
        </div>
      </div>

      <div className="flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <h2 className="font-semibold text-lg text-gray-800 pr-4 flex flex-col gap-2">
            {form.title.slice(0, 10)}
            <span>
              {form.description && (
                <p className="text-gray-500 font-normal text-sm line-clamp-2">
                  {form.description}
                </p>
              )}
            </span>
          </h2>

          {form.status && <CopyToClipboard textToCopy={copyToClipboardText} />}
        </div>

        <div className=" flex items-center gap-3 border-t pt-4">
          <Link
            href={`/form/${form.id}/1/builder`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-sm transition-colors"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </Link>

          <Link
            href={`/form/${form.id}/submission`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-sm transition-colors"
          >
            <BarChart className="w-4 h-4" />
            <span>Submissions</span>
          </Link>

          {form.status && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-sm transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>Archive</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
