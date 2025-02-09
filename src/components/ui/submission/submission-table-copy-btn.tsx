import { Clipboard, ClipboardCheck } from "lucide-react";
import { FC } from "react";

interface ColumnDataCopyButtonProps{
    value: string;
    columnId: string;
    copiedColumn: string | null;
    onCopy: (value: string, columnId: string) => void;
}

const ColumnDataCopyButton: FC<ColumnDataCopyButtonProps> = ({value, columnId, copiedColumn, onCopy}) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCopy(value, columnId);
        }}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded transition-all 
          ${
            copiedColumn === columnId ? "bg-green-400" : "bg-gray-200"
          } group-hover:inline-block hidden`}
      >
        {copiedColumn === columnId ? (
          <ClipboardCheck className="w-4 h-4 text-white" />
        ) : (
          <Clipboard className="w-4 h-4 text-gray-600" />
        )}
      </button>
    );
  };

  export default ColumnDataCopyButton; 