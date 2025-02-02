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
      className={`border rounded-md p-2 ${
        isCopied ? "bg-green-300" : "bg-transparent"
      }`}
      onClick={handleCopy}
    >
      <LinkIcon size={20} />
    </button>
  );
};

export default CopyToClipboard;
