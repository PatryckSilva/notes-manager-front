import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const ismobile = window.innerWidth < MOBILE_BREAKPOINT;

    const onChange = () => {
      setIsMobile(ismobile);
    };

    mql.addEventListener("change", onChange);

    setIsMobile(ismobile);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
