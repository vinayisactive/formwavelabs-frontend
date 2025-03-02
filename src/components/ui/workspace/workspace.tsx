"use client";
import React, { useState } from "react";
import FormCard from "../form-card";
import { PanelLeft, PanelRight } from "lucide-react";


interface Form {
  id: string;
  title: string;
  status: boolean;
  _count: { pages: number, submissions: number };
  createdAt: string;
}

interface WorkspaceData {
  forms: Form[];
  members: [];
  id: string;
}

interface WorkspaceInterface {
  status: "success" | "error";
  data: WorkspaceData;
  message: string;
}


const Workspace = ({ workspace }: { workspace: WorkspaceInterface }) => {
  const { forms, id } = workspace.data;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full h-full overflow-auto bg-gray-100 px-2 md:px-6">

      <div className="h-[6%] flex items-center">
        <button onClick={() => setIsSidebarOpen(true)} className=" hover:bg-gray-100 rounded-lg md:hidden">
          <PanelRight className="h-5 w-5" />
        </button>
      </div>

      <div className="h-[94%] p-4 flex flex-col gap-3 rounded-tl-md rounded-tr-md border bg-white shadow-md">
        {forms.map((form, index) => (
          <FormCard key={form.id} index={index} formId={form.id} workspaceId={id} title={form.title} status={form.status} submissions={form._count.submissions} />
        ))}
      </div>


      <div className={`fixed inset-0 transition-opacity ${isSidebarOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"} md:hidden`}>

        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0" }`}onClick={() => setIsSidebarOpen(false)}/>

        <div className={`absolute left-0 top-0 w-3/4 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Workspace Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <PanelLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4"> </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;