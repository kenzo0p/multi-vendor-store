import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidht = 240; //widht of dropdown (w-60 = 15rem  - 240 px)

    //calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    //check if the position would go off the right edge of viewport
    if (left + dropdownWidht > window.innerWidth) {
      //Allign to right edge of button instead
      left = rect.right + window.scrollY - dropdownWidht;

      //if still off-screen , align to the right edge of viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropdownWidht - 16;
      }
    }

    //Ensure dropdown doesn't go off left edge
    if (left < 0) {
      left = 16;
    }

    return { top, left };
  };

  return { getDropdownPosition };
};
