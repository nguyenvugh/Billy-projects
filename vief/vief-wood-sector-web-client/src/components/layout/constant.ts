import { useEffect, useState } from "react";
import React from "react";

export const useScrollPosition = () => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const updatePosition = () => {
      setPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return position;
};
