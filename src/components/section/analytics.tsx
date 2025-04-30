"use client"
import { handleAxiosError } from "@/utility/axios-err-handler";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

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




  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center max-w-screen-xl mx-auto px-4 py-8">
        Loading analytics data...
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-7 py-2.5 space-y-3 overflow-x-hidden">
        <button onClick={() => console.log(analyticsData)}>console the data</button>
    </div>
  );
};

export default Analytics;