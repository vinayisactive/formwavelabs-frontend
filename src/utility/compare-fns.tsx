import { FormElemetInstance } from "./ts-types";

const compareObjects = (
  elementInstanceOneObj: FormElemetInstance,
  elementInstanceTwoObj: FormElemetInstance
): boolean => {
  const elmentObjectOneKeys = Object.keys(elementInstanceTwoObj) as (keyof FormElemetInstance)[];
  const elementObjectTwoKeys = Object.keys(elementInstanceTwoObj) as (keyof FormElemetInstance)[];

  if (elmentObjectOneKeys.length !== elementObjectTwoKeys.length) return true;

  return elmentObjectOneKeys.some((key) => {
    const val1 = elementInstanceOneObj[key];
    const val2 = elementInstanceTwoObj[key];

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

export const areElementsChanged = (
  arr1: FormElemetInstance[] | null,
  arr2: FormElemetInstance[]
): boolean => {
  if (!arr1 || arr1.length === 0) {
    return arr2.length > 0;
  }

  if (arr1.length !== arr2.length) return true;

  return arr1.some((originalObj, index) => compareObjects(originalObj, arr2[index]));
};