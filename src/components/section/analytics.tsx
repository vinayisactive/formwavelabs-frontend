"use client"
import { handleAxiosError } from "@/utility/axios-err-handler";
import axios from "axios";
import {Eye, BarChart, Clock, CalendarDays, Globe} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Pie,
    Cell,
    PieChart
  } from "recharts";
import { Breadcrumb } from "../ui/builder/builder-navbar/common-comp";

export interface FormDataInterface {
  id: string; 
  title: string; 
  status: boolean; 
  workspace: {
    id: string; 
    name: string; 
  }
}

interface AnalyticsData {
  form: FormDataInterface; 
  totalVisits: number;
  totalSubmissions: number;
  conversionRate: string;
  deviceBreakdown: {
    desktop: number,
    mobile: number
  }
  recentDailyAnalytics: Array<{
    createdAt: string;
    totalVisit: number;
    totalSubmissions: number;
  }>;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

interface SectionHeaderProps {
  title: string;
}

// const Breadcrumb = ({ workspaceId, workspaceName, formTitle }: { 
//   workspaceId: string | undefined;
//   workspaceName: string | undefined;
//   formTitle: string | undefined;
// }) => (
//   <div className="mb-8 flex items-center text-sm text-gray-500">
//     <HiOutlineSquare3Stack3D className="mr-2 h-4 w-4" />
//     <Link
//       href={`/workspaces/${workspaceId}`}
//       className="hover:text-gray-700 hover:underline"
//     >
//       {workspaceName || "Loading..."}
//     </Link>
//     <ChevronsRight className="mx-2 h-4 w-4" />
//     <span className="font-medium text-gray-900">
//       {formTitle ? `${formTitle.slice(0, 15)}${formTitle.length > 15 ? "..." : ""}` : "Loading..."}
//     </span>
//   </div>
// );

const StatsCard = ({ title, value, icon, color = 'gray' }: StatsCardProps) => (
  <div className={`bg-white p-6 rounded-xl border border-${color}-100 shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm text-${color}-500 mb-1`}>{title}</p>
        <p className={`text-3xl font-bold text-${color}-800`}>{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <div className="flex items-center mb-4 border p-3 rounded-xl bg-gray-100">
    <h2 className="text-2xl font-semibold mr-3">{title}</h2>
  </div>
);

const EngagementTrends = ({ data }: { data: AnalyticsData['recentDailyAnalytics'] | undefined }) => {
    const chartData = data?.map(item => ({
      date: new Date(item.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      visits: item.totalVisit,
      submissions: item.totalSubmissions
    })) || [];
  
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center mb-6">
          <h3 className="text-xl font-semibold mr-3">Engagement Trends</h3>
          <span className="h-px flex-1 bg-gray-200 ml-3"></span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Total Visits"
              />
              <Line
                type="monotone"
                dataKey="submissions"
                stroke="#10b981"
                strokeWidth={2}
                name="Total Submissions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  const DeviceBreakdownChart = ({ data }: { data: AnalyticsData['deviceBreakdown'] | undefined }) => {
    const chartData = [
      { name: 'Desktop', value: data?.desktop || 0 },
      { name: 'Mobile', value: data?.mobile || 0 }
    ];
  
    const COLORS = ['#3b82f6', '#10b981'];
  
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center mb-6">
          <h3 className="text-xl font-semibold mr-3">Device Breakdown</h3>
          <span className="h-px flex-1 bg-gray-200 ml-3"></span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  export interface FormDataInterface {
    id: string; 
    title: string; 
    status: boolean; 
    workspace: {
      id: string; 
      name: string; 
    }
  }

const Analytics = ({ formId }: { formId: string }) => {
  const { data: currentUserData, status } = useSession();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(status === "authenticated" && currentUserData.accessToken){
     const fetchData = async () => {
        try {
; 
        const analyticsRes = await axios.get(
          `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/forms/${formId}/track`,
        );
        setAnalyticsData(analyticsRes.data.data);  
      } catch (error) {
        console.error(handleAxiosError(error));
      } finally {
        setLoading(false);
      }
    };

      fetchData();
    }else if (status === "unauthenticated") {
        setLoading(false);
    }
  }, [formId, currentUserData, status]);


  const totalStats = [
    { 
      title: "Total Visits", 
      value: analyticsData?.totalVisits ?? '--', 
      icon: <Eye className="h-8 w-8 text-blue-500 bg-blue-100 p-2 rounded-lg" />
    },
    { 
      title: "Total Submissions", 
      value: analyticsData?.totalSubmissions ?? '--', 
      icon: <BarChart className="h-8 w-8 text-green-500 bg-green-100 p-2 rounded-lg" />
    },
    { 
      title: "Conversion Rate", 
      value: analyticsData?.conversionRate ? `${parseFloat(analyticsData.conversionRate).toFixed(1)}%` : '--', 
      icon: <Globe className="h-8 w-8 text-purple-500 bg-purple-100 p-2 rounded-lg" />
    }
  ];

  const todayStats = [
    { 
      title: "Today's Visits", 
      value: analyticsData?.recentDailyAnalytics?.[0]?.totalVisit ?? '--', 
      icon: <CalendarDays className="h-8 w-8 text-blue-500" />,
      color: "blue"
    },
    { 
      title: "Today's Submissions", 
      value: analyticsData?.recentDailyAnalytics?.[0]?.totalSubmissions ?? '--', 
      icon: <Clock className="h-8 w-8 text-green-500" />,
      color: "green"
    }
  ];

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center max-w-screen-xl mx-auto px-4 py-8">
        Loading analytics data...
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-7 py-2.5 space-y-3 overflow-x-hidden">
      <div className="w-full md:w-1/3 flex items-center h-full border rounded-md md:border-none shadow-inner md:shadow-none">
        <Breadcrumb
          workspaceId={analyticsData?.form.workspace.id}
          workspaceName={analyticsData?.form.workspace.name}
          formTitle={analyticsData?.form.title}
        />
      </div>

      <div className="mb-10">
        <SectionHeader title="Overall Analytics" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {totalStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <SectionHeader title="Daily Insights" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todayStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>
      </div>

      <EngagementTrends data={analyticsData?.recentDailyAnalytics} />
      <DeviceBreakdownChart  data={analyticsData?.deviceBreakdown}/>
    </div>
  );
};

export default Analytics;