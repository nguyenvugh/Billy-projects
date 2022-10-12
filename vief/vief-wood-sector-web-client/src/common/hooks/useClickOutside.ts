import { useEffect, useRef } from "react";

/**
 * Usually need to combine with `stopPropagation` to work as expected
 * @param callback callback to execute when click outside
 */
export function useClickOutside(callback: () => void) {
  const domNode = useRef<HTMLElement>();
  useEffect(() => {
    function mouseEvent(event: Event) {
      if (!domNode.current?.contains(event.target as Node)) {
        callback();
      }
    }
    window.addEventListener("mousedown", mouseEvent as EventListener);
    return () =>
      window.removeEventListener("mousedown", mouseEvent as EventListener);
  });

  return domNode;
}
