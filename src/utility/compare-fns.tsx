import { FormElemetInstance } from "./ts-types";

export const areElementsChanged = ( arr1: FormElemetInstance[] | null, arr2: FormElemetInstance[]): boolean => {
    if (!arr1 || arr1.length === 0) {
      return arr2.length > 0;
    }
  
    if (arr1.length !== arr2.length) return true;
  
    const compareObjects = (
      obj1: FormElemetInstance,
      obj2: FormElemetInstance
    ): boolean => {
      const keys1 = Object.keys(obj1) as (keyof FormElemetInstance)[];
      const keys2 = Object.keys(obj2) as (keyof FormElemetInstance)[];
  
      if (keys1.length !== keys2.length) return true;
  
      return keys1.some((key) => {
        const val1 = obj1[key];
        const val2 = obj2[key];
  
        if (typeof val1 === "object" && typeof val2 === "object") {
          if (Array.isArray(val1) && Array.isArray(val2)) {
            return JSON.stringify(val1) !== JSON.stringify(val2);
          }
          return compareObjects(
            val1 as FormElemetInstance,
            val2 as FormElemetInstance
          );
        }
  
        return val1 !== val2;
      });
    };
  
    return arr1.some((originalObj, index) =>
      compareObjects(originalObj, arr2[index])
    );
  };
  