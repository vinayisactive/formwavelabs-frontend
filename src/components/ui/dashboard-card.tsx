// DashboardCard.tsx
import Link from "next/link";
import { CheckCircle2, Pencil, BarChart, DraftingCompass } from "lucide-react";
import CopyToClipboard from "./copy-to-clipboard";

interface DashboardCardProps {
  form: {
    id: string;
    title: string;
    description?: string;
    status: boolean;
  };
}

const DashboardCard = ({ form }: DashboardCardProps) => {
  return (
    <div className="w-full p-4 bg-white border rounded-lg flex flex-col justify-between hover:shadow-sm transition-all">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 break-words">
            {form.title}
          </h3>
          {form.description && (
            <p className="text-gray-500 text-sm mt-1 break-words whitespace-pre-wrap">
              {form.description}
            </p>
          )}
        </div>
        {form.status ? (
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
        ) : (
          <DraftingCompass className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
        )}
      </div>

      <div className="flex items-center gap-4 pt-4 mt-4 border-t">
        <Link
          href={`/form/${form.id}/builder`}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
        
        <Link
          href={`/form/${form.id}/submission`}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          <BarChart className="w-4 h-4" />
          Insights
        </Link>

        {form.status && (
          <CopyToClipboard
            textToCopy={`https://formwavelabs-frontend.vercel.app/submit/${form.id}`}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardCard;