import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DashboardCard from "../ui/dashboard-card";
import { getServerSession } from "next-auth";
import { AlertCircle } from "lucide-react";

interface Form {
  id: string;
  title: string;
  description?: string;
  status: boolean;
}

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  let forms: Form[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) throw new Error(`Failed to fetch forms: ${res.status}`);
    forms = (await res.json()).data;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load forms";
  }

  return (
    <div className="w-full px-4 sm:px-6 py-6 h-full">
      {error ? (
        <div className="flex flex-col items-center justify-center h-full space-y-3">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <p className="text-gray-600 text-center max-w-md">{error}</p>
        </div>
      ) : forms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forms.map((form) => (
            <DashboardCard key={form.id} form={form} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">No forms created yet</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;