import { RefObject, useEffect, useState } from "react";

const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = "0px" }
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef.current;
    const isIOSupport = !!window.IntersectionObserver;

    if (!node || !isIOSupport) {
      return;
    }

    const options = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, root, rootMargin, threshold]);

  return entry;
};

export default useIntersectionObserver;
