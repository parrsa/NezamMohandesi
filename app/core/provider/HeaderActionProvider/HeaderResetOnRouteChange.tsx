"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useHeaderAction } from "./HeaderAction";

export function HeaderResetOnRouteChange() {
  const pathname = usePathname();
  const { setAction, setActionSecound } = useHeaderAction();

  useEffect(() => {
    setAction(null);
    setActionSecound(null);
  }, [pathname]);

  return null;
}
