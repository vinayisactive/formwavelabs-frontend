"use client";

import { useState } from "react";
import { LinkIcon } from "lucide-react";

interface CopyToClipboardProps {
  textToCopy: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textToCopy }) => {
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
      className={`border rounded-md p-[5px] hover:bg-gray-200 ${
        isCopied ? "bg-green-300 hover:bg-green-300" : "bg-white"
      }`}
      onClick={handleCopy}
    >
      <LinkIcon size={16} />
    </button>
  );
};

export default CopyToClipboard;
