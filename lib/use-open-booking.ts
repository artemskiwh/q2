"use client";

import { useEffect } from "react";

/**
 * Listen for the global "open-booking" custom event dispatched by anything
 * that wants to open the site-wide booking modal (side menu, footer, etc.).
 */
export function useOpenBooking(handler: () => void) {
  useEffect(() => {
    const listener = () => handler();
    window.addEventListener("open-booking", listener);
    return () => window.removeEventListener("open-booking", listener);
  }, [handler]);
}
