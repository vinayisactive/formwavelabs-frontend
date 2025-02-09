import { ProcessedSubmission } from "@/components/section/submissions";
import { FC } from "react";
import ColumnDataCopyButton from "./submission-table-copy-btn";

interface TableRowProps{
  submission: ProcessedSubmission;
  index: number;
  selectedRow: string | null;
  copiedColumn: string | null;
  onRowClick: (id: string) => void;
  onCopy: (value: string, columnId: string) => void;
}

const TableRow : FC<TableRowProps>= ({submission, index, selectedRow, copiedColumn, onRowClick, onCopy}) => (
  <tr key={submission.id} className={`${selectedRow === submission.id ? "bg-gray-200" : ""}`} onClick={() => onRowClick(submission.id)}>
    <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300">{index + 1}</td>
   
    {Object.entries(submission.content).map(([label, value]) => (
      <td
        key={label}
        className="px-4 py-3 text-sm text-gray-900 border border-gray-300 break-words whitespace-nowrap relative group"
      >
        {value || <span className="italic text-gray-400">No response</span>}
        <ColumnDataCopyButton
          value={value}
          columnId={label}
          copiedColumn={copiedColumn}
          onCopy={onCopy}
        />
      </td>
    ))}

    <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">
      {new Date(submission.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </td>

  </tr>
);

export default TableRow;