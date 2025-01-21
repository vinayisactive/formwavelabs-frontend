import React from "react";

type TabType = "builder" | "preview";

interface BuilderNavbarProps {
    setTab: React.Dispatch<React.SetStateAction<TabType>>;
  }

  const BuilderNavbar: React.FC<BuilderNavbarProps> = ({ setTab }) => {
    return (
      <div className="flex justify-center items-center border h-12 gap-2">
        <button onClick={() => setTab("builder")}>Builder</button>
        <button onClick={() => setTab("preview")}>Preview</button>
      </div>
    );
  };
  

export default BuilderNavbar;
