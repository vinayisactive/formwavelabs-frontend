"use client";
import { FormElemetInstance } from "@/utility/ts-types";
import { TextCustomInstance } from "./text-prop-attributes";
import { useState } from "react";
import useElements from "@/utility/useElements-hook";

const TextPropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElemetInstance;
}) => {

  // console.log(elementInstance);

  const currentElement = elementInstance as TextCustomInstance; 
  const [ extraAttributes, setExtraAttributes ] = useState(currentElement.extraAttributes);

  const { updateElementInstance, setSelectedElementInstance} = useElements();

  const handleInputChange = (key: keyof typeof currentElement.extraAttributes, value: string | boolean) => {
    setExtraAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const updatedElement = {
      ...currentElement,
      extraAttributes,
    };

    // console.log(updatedElement);

    updateElementInstance(currentElement.id, updatedElement);
   setSelectedElementInstance(null); 
  };

  return (
    <div className="w-full flex flex-col justify-start gap-2">
      <h3 className="font-semibold">Text Properties</h3>

      <p className="">
        <span className="font-medium">Type:</span> {currentElement.type}
      </p>

      {/* <p className="">
        <span className="font-medium">ID:</span> {currentElement.id}
      </p> */}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Label</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={extraAttributes.label}
            onChange={(e) => handleInputChange("label", e.target.value)}
            placeholder={extraAttributes.label}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Helper Text</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={extraAttributes.helperText}
            onChange={(e) => handleInputChange("helperText", e.target.value)}
            placeholder={extraAttributes.helperText}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Placeholder</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={extraAttributes.placeholder}
            onChange={(e) => handleInputChange("placeholder", e.target.value)}
            placeholder={extraAttributes.placeholder}
          />
        </div>


        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-5 h-5 border-gray-300 rounded focus:ring focus:ring-blue-300"
            checked={extraAttributes.required}
            onChange={(e) => handleInputChange("required", e.target.checked)}
          />
          <label className="text-sm font-medium">Required</label>
        </div>
      </div>


      <button
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full"
        onClick={handleSave}
      >
        Save
      </button>

      <button
        className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 w-full"
        onClick={() => setSelectedElementInstance(null)}
      >
        close
      </button>

    </div>
  );
};

export default TextPropertiesComponent;
