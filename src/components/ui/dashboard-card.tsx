import Link from "next/link";
import { CheckCircle2, Pencil, Trash2, BarChart, DraftingCompass } from "lucide-react";
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
    <div className="group relative p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
      {/* Status Ribbon */}
      <div className="absolute -top-3 -right-3">
        <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${
          form.status
            ? "bg-green-100/90 backdrop-blur-sm text-green-700"
            : "bg-purple-100/90 backdrop-blur-sm text-purple-700"
        }`}>
          {form.status ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <DraftingCompass className="w-4 h-4" />
          )}
          <span>{form.status ? "Live" : "Draft"}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* Title Row */}
        <div className="flex items-start justify-between">
          <h2 className="font-semibold text-lg text-gray-800 pr-4">
            {form.title}
          </h2>
          {form.status && (
            <CopyToClipboard textToCopy={copyToClipboardText} />
          )}
        </div>

        {/* Description */}
        {form.description && (
          <p className="text-gray-500 text-sm leading-relaxed">
            {form.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-3 flex items-center gap-3 border-t pt-4">
          <Link
            href={`/form/${form.id}/1/builder`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </Link>

          <Link
            href={`/form/${form.id}/submission`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <BarChart className="w-4 h-4" />
            <span>Submissions</span>
          </Link>

          {form.status && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>Archive</span>
            </button>
          )}
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
    </div>
  );
};

export default DashboardCard;