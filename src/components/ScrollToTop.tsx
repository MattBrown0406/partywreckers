import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // React Router doesn't scroll to #anchors, so do it once the new page has rendered.
      const id = decodeURIComponent(hash.slice(1));
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
