"use client";
import { ProcessedSubmission } from "@/components/section/submissions";
import { BarChart2 } from "lucide-react";
import { FC, useState } from "react";

import TableRow from "./submission-table-row";
import TableHeader from "./submission-table-header";
import EmptyDataState from "./empty-data-state";

interface SubmissionTableProps{
  submissions: ProcessedSubmission[];
  errMsg: string;
  formTitle: string;
}

const SubmissionTable: FC<SubmissionTableProps> = ({submissions, errMsg, formTitle}) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [copiedColumn, setCopiedColumn] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setSelectedRow((prev) => (prev === id ? null : id));
  };

  const handleCopy = (value: string, columnId: string) => {
    navigator.clipboard.writeText(value);
    setCopiedColumn(columnId);
    setTimeout(() => setCopiedColumn(null), 3000);
  };

  return (
    <div className="w-full space-y-5 px-4 py-2">


      <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
        <span>Submissions</span>
        {submissions.length > 0 && (
          <span className="text-lg font-medium text-gray-500 flex items-center gap-2 pt-1">
            <BarChart2 className="w-5 h-5 text-gray-400" />
            {submissions.length} responses
          </span>
        )}
      </h1>

      <h1 className="text-lg">
        {formTitle}
      </h1>

      {submissions.length > 0 ? (
        <div className="overflow-auto max-h-[70vh]">
         
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

export default SubmissionTable;
