import { useState, useRef, useEffect } from "react";
export const useStateCallback = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<any>(null); // mutable ref to store current callback

  const setStateCallback = (state: any, cb: any) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  };

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state updates
    if (cbRef.current) {
      typeof cbRef.current === "function" && cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};
