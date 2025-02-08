"use client";

import { useSearchParams } from "next/navigation";
import Admins from "@/components/admin-dashboard/admins";
import SideBar from "@/components/admin-dashboard/sideBar";
import Units from "@/components/admin-dashboard/units";

export default function AdminsPage() {
  const searchParams = useSearchParams();
  const hasAdminsQuery = searchParams.has("admins");
  const hasUnitsQuery = searchParams.has("units");

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 right-0 h-screen bg-white shadow-lg z-50 w-[250px]">
        <SideBar />
      </aside>

      {/* Scrollable Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen mr-[250px]">
        {hasAdminsQuery && <Admins />}
        {hasUnitsQuery && <Units />}
      </main>
    </div>
  );
}
