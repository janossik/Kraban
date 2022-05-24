import { useState, useRef, useEffect } from "react";

const useModal = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const close = () => setActive(false);
  const open = () => setActive(true);
  const invert = () => setActive((v) => !v);

  useEffect(() => {
    const closeNavigationIfClickOtherElement = (e: MouseEvent) => {
      const { current } = ref;
      if (active && current) {
        let clickInNavigation: boolean = current.contains(e.target as Node);
        if (!clickInNavigation) {
          close();
        }
      }
    };
    document.addEventListener("click", closeNavigationIfClickOtherElement);
    return () => {
      document.removeEventListener("click", closeNavigationIfClickOtherElement);
    };
  }, [active]);

  return { active, setActive, ref, close, open, invert };
};

export default useModal;
