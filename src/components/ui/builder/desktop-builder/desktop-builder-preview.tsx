"use client";

import { FormElemets } from "@/utility/static-data";
import { FormElemetInstance } from "@/utility/ts-types";
import useElements from "@/utility/useElements-hook";
import { useEffect, useRef, useState } from "react";

const DesktopBuilderPreview = ({formTheme}: {formTheme: "BOXY" | "ROUNDED" | undefined}) => {
  const { elements } = useElements();
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const prevElementLength = useRef<number>(elements.length);
  const [isScrollAllowed, setIsScrollAllowed] = useState<boolean>(false);

  setTimeout(() => {
    setIsScrollAllowed(true);
  }, 2000);

  useEffect(() => {
    if ( previewContainerRef.current && prevElementLength.current < elements.length) {
      if (!isScrollAllowed) {
        return;
      }

      previewContainerRef.current.scrollTo({
        top: previewContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    prevElementLength.current = elements.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements.length]);

  return (
    <div className="h-full overflow-y-scroll p-3" ref={previewContainerRef}>
      <div
        className={`flex flex-col gap-5 p-2 mx-auto shadow-md  bg-white ${
          formTheme === "BOXY"
            ? "border-r-4 border-b-4 border-black border"
            : "border rounded-md"
        }`}
      >
        {elements?.map((el: FormElemetInstance) => {
          const SubmitComponent = FormElemets[el?.type].submit;
          return (
            <div key={el?.id}>
              <SubmitComponent elementInstance={el} theme={formTheme} />
            </div>
          );
        })}

        {elements.length === 0 && (
          <div className="text-center">Add form elements in builder</div>
        )}
      </div>
    </div>
  );
};

export default DesktopBuilderPreview;