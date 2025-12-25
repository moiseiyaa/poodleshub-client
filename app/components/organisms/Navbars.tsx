"use client";

import { usePathname } from "next/navigation";
import PromotionNavbar from "./PromotionNavbar";
import Navbar from "./Navbar";

/**
 * Renders the public site navbars except on /admin routes.
 */
export default function Navbars() {
  const pathname = usePathname();
  // Hide on any /admin page (e.g. /admin, /admin/*)
  const isAdminRoute = pathname?.startsWith("/admin");
  if (isAdminRoute) return null;

  return (
    <>
      <PromotionNavbar />
      <Navbar />
    </>
  );
}
