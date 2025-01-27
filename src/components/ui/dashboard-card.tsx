import Link from "next/link";
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
    <div className="p-4 border rounded shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{form.title}</h2>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm px-2 py-1 rounded ${
              form.status
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {form.status ? "Published" : "Draft"}
          </span>
          {form.status && <CopyToClipboard textToCopy={copyToClipboardText} />}
        </div>
      </div>
      {form.description && <p className="text-gray-600 mt-2">{form.description}</p>}
      <div className="mt-4 flex justify-end gap-4">
        {form.status && (
          <button className="text-red-500 hover:underline">Delete Form</button>
        )}
        <Link
          href={`/form/${form.id}/1/builder`}
          className="text-blue-500 hover:underline"
        >
          Edit
        </Link>
        <Link
          href={`/form/${form.id}/submission`}
          className="text-green-400 hover:underline"
        >
          Submissions
        </Link>
      </div>
    </div>
  );
};

export default DashboardCard;
