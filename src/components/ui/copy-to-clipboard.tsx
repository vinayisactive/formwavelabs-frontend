"use client";

import { useState } from "react";
import { LinkIcon } from "lucide-react";

interface CopyToClipboardProps {
  textToCopy: string;
  className?: string
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textToCopy, className = "" }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <button
      className={`border p-[4px] px-3 rounded-2xl hover:bg-gray-200 ${
        isCopied ? "bg-green-300 hover:bg-green-300" : "bg-white"
      } ${className}`}
      onClick={handleCopy}
    >
      <LinkIcon size={14} />
    </button>
  );
};

export default CopyToClipboard;
