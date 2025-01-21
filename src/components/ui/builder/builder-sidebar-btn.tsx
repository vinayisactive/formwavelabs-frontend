"use client";

import { FormElemet } from "@/utility/ts-types";
import { useDraggable } from "@dnd-kit/core";
import React, { useState, useEffect } from "react";

const SidebarBtnElement = ({ FormElement }: { FormElement: FormElemet}) => {
  const [mounted, setMounted] = useState(false);
  const label = FormElement.elementButton.label;

  useEffect(() => {
    setMounted(true);
  }, []);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `designer-btn-${FormElement.type}`,
    data: {
      type: FormElement.type,
      isDesignerBtnElement: true,
    },
  });

  if (!mounted) {
    return (
      <button
        className="w-[100px] h-[100px] flex justify-center items-center border rounded-md cursor-grab"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`w-[100px] h-[100px] flex justify-center items-center border rounded-md cursor-grab ${
        isDragging ? "bg-black text-white" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default SidebarBtnElement;
