"use client";
import useElements from "@/utility/useElements-hook";
import FormElementsContainer from "./element-container/form-elements-container";
import ElementTileReOrder from "./reorder-container/element-tile-reorder-dnd";
import { FormElemets } from "@/utility/static-data";
import { useState } from "react";

const BuilderSideBar = () => {
  const [isElementModalActive, setElementModalActive] =useState<boolean>(false);
  const { selectedElementInstance } = useElements();

  let ElementEditSetting = null;

  if (selectedElementInstance) {
    ElementEditSetting =
      FormElemets[selectedElementInstance?.type].setting;
  }

  return (
    <aside className="md:w-[250px] lg:w-[300px] max-w-[400px] flex flex-col h-full  relative">
     
      <button
        className="bg-black md:hidden rounded-md text-white py-2 mt-4 ml-2"
        onClick={() => setElementModalActive(!isElementModalActive)}
      >
        Add Element
      </button>



      <div className="hidden md:flex h-[50%] md:h-[40%]">
        <FormElementsContainer />
      </div>

      <div className="h-[50%] md:h-[60%]">
        <ElementTileReOrder />
      </div>



      {selectedElementInstance && ElementEditSetting && (
        <div className="h-full w-screen bg-black/10 px-2 py-5 backdrop-blur-sm border absolute overflow-y-auto scroll-smooth z-[10]">
          <ElementEditSetting elementInstance={selectedElementInstance} />
        </div>
      )}


      {isElementModalActive && (
        <div
          className="h-full w-screen pt-10 bg-black/10 px-2 py-5 backdrop-blur-sm border absolute overflow-y-auto scroll-smooth"
          onClick={() => setElementModalActive(!isElementModalActive)}
        >
          <FormElementsContainer
            setElementModalActive={setElementModalActive}
          />
        </div>
      )}
    </aside>
  );
};

export default BuilderSideBar;
