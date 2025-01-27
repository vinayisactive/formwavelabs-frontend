// import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DashboardCard from "../ui/dashboard-card";
import { getServerSession } from "next-auth";

interface Form {
  id: string;
  title: string;
  description?: string;
  status: boolean;
}

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken

  let forms: Form[] = [];
  let errorMsg: string | null = null;

  try {
    const response = await fetch(
      "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    forms = data.data;
  } catch (error) {
    errorMsg = error as string
  }

  return (
    <div className="w-full h-full p-6 flex flex-col items-center pt-24">
      {errorMsg ? (
        <div className="text-red-500 text-center">
          <p>Error loading forms:</p>
          <p>{errorMsg}</p>
        </div>
      ) : forms.length > 0 ? (
        <div className="w-full max-w-4xl grid gap-4">
          {forms.map((form) => (
            <DashboardCard key={form.id} form={form} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No forms found.</p>
      )}
    </div>
  );
};

export default Dashboard;
