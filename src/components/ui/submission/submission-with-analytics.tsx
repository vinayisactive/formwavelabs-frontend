"use client";
import { ProcessedSubmission } from "@/components/section/submissions";
import { BarChart2, ChevronsRight} from "lucide-react";
import { FC, useEffect, useState } from "react";

import TableRow from "./submission-table-row";
import TableHeader from "./submission-table-header";
import EmptyDataState from "./empty-data-state";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { handleAxiosError } from "@/utility/axios-err-handler";
import Link from "next/link";

interface SubmissionTableProps{
  submissions: ProcessedSubmission[];
  errMsg: string;
  formTitle: string;
  workspaceId: string; 
}

const SubmissionWithAnalytics: FC<SubmissionTableProps> = ({submissions, errMsg, formTitle, workspaceId}) => {
  const currentUserData = useSession().data
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [copiedColumn, setCopiedColumn] = useState<string | null>(null);
  const [workspaceName, setWorkspaceName] = useState<null | string>(null);


    useEffect(() => {
      const fetchWorkspace = async () => {
        try {
          const data = await fetch(
            `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${currentUserData?.accessToken}`,
              },
            }
          );
  
          const response = await data.json();
          setWorkspaceName(response.data.name);
        } catch (error) {
          console.log(handleAxiosError(error));
        }
      };
  
      fetchWorkspace();
    },[]);

  const handleRowClick = (id: string) => {
    setSelectedRow((prev) => (prev === id ? null : id));
  };

  const handleCopy = (value: string, columnId: string) => {
    navigator.clipboard.writeText(value);
    setCopiedColumn(columnId);
    setTimeout(() => setCopiedColumn(null), 3000);
  };



  return (
    <div className="w-full space-y-2 px-4 py-2">

    <div className="w-full md:w-1/3 text-black text-left flex items-center gap-1">
      <HiOutlineSquare3Stack3D />
      <Link
        href={`/workspaces/${workspaceId}`}
        className="font-bold text-sm text-gray-500 hover:underline whitespace-nowrap"
      >
        {workspaceName ? workspaceName : "loading..."}
      </Link>
      <ChevronsRight size={15} />
      {formTitle && formTitle?.length > 15
        ? formTitle?.slice(0, 15)
        : formTitle}
      ...
    </div>

      <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
        <span>Submissions</span>
        {submissions.length > 0 && (
          <span className="text-lg font-medium text-gray-500 flex items-center gap-2 pt-1">
            <BarChart2 className="w-5 h-5 text-gray-400" />
            {submissions.length} responses
          </span>
        )}
      </h1>

      {submissions.length > 0 ? (
        <div className="overflow-auto max-h-[70vh] mt-1">
         
          <table className="w-full table-auto">
            <TableHeader headers={Object.keys(submissions[0].content)} />
  
            <tbody className="divide-y divide-gray-300 bg-white">
              {submissions.map((submission, index) => (
                <TableRow
                  key={submission.id}
                  submission={submission}
                  index={index}
                  selectedRow={selectedRow}
                  copiedColumn={copiedColumn}
                  onRowClick={handleRowClick}
                  onCopy={handleCopy}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !errMsg && <EmptyDataState/>
      )}
    </div>
  );
};

export default SubmissionWithAnalytics;
