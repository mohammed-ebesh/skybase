import React from "react";
import { AuthService } from "@/services/AuthService";
import { Users, Layers, FileText, LogOut, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function SideBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.toString(); // Get current query string

  const handleLogout = () => {
    AuthService.logout();
    router.replace("/auth/sign-in");
  };

  const menuItems = [
    { name: "المسؤولون", icon: Users, query: "admins" },
    { name: "الوحدات", icon: Layers, query: "units" },
    { name: "التقارير", icon: FileText, query: "reports" },
  ];

  return (
    <div className="h-full bg-[#292929] text-white shadow-lg py-4 flex flex-col">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-white hover:bg-white hover:text-[#292929] transition-all px-4 py-2 "
      >
        <ArrowLeft size={20} />
        <span>الرئيسية</span>
      </button>

      {/* Dashboard Title */}
      <h2 className="text-lg font-semibold text-white mt-6 px-4">
        لوحة التحكم
      </h2>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2 mt-4">
        {menuItems.map(({ name, icon: Icon, query }) => (
          <button
            key={query}
            onClick={() => router.push(`?${query}`)}
            className={`flex items-center gap-3 px-4 py-3 w-full  transition-all ${
              activeTab.includes(query)
                ? "bg-white text-[#292929] "
                : "hover:bg-white hover:text-[#292929]"
            }`}
          >
            <Icon size={20} />
            <span>{name}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button (Pushes to Bottom) */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-white hover:text-red-500 transition-all mt-auto "
      >
        <LogOut size={20} />
        <span>تسجيل الخروج</span>
      </button>
    </div>
  );
}

export default SideBar;
