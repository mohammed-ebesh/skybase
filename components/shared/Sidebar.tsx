"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthService } from "@/services/AuthService";
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Undo,
  ChartBar,
  Stethoscope,
  UserPlus,
  LayoutGrid,
  ArrowUpDown,
  TableProperties,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dispatch, SetStateAction } from "react";

// Define Menu Item Type
interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

// Define Sidebar Props
interface AppSidebarProps {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
}

// Menu Items Data (Typed)
const menuItems: Record<string, MenuItem[]> = {
  officers: [
    { title: "جدول الضباط", url: "#", icon: TableProperties },
    { title: "تمام الضباط", url: "#", icon: Home },
    { title: "النوبتجيات", url: "#", icon: Calendar },
    { title: "المأموريات", url: "#", icon: Inbox },
    { title: "النماذج والتقارير", url: "#", icon: ChartBar },
    { title: "المواقف الطبية", url: "#", icon: Stethoscope },
    { title: "مواقف متنوعة", url: "#", icon: LayoutGrid },
    { title: "إنشاء كرت ظابط", url: "#", icon: UserPlus },
  ],
  administration: [
    { title: "جدول صف الضباط", url: "#", icon: TableProperties },
    { title: "تمام ضباط الصف", url: "#", icon: Home },
    { title: "النوبتجيات", url: "#", icon: Calendar },
    { title: "المأموريات", url: "#", icon: Inbox },
    { title: "المواقف الطبية", url: "#", icon: Stethoscope },
    { title: "لجان التسليم والتسلم", url: "#", icon: ArrowUpDown },
    { title: "بيانات النموذج", url: "#", icon: LayoutGrid },
    { title: "إضافة صف ضابط", url: "#", icon: UserPlus },
  ],
};

export function AppSidebar({
  setIsSidebarOpen,
  isSidebarOpen,
}: AppSidebarProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract route details
  const currentSectionId = searchParams.get("sectionId");
  const segments = pathname.split("/");
  const unitId = segments[2] || "";
  const pageTitle = segments[3] || "";

  // Determine menu based on page title
  const currentMenuItems = menuItems[pageTitle] || menuItems.officers;

  // Logout function
  const handleLogout = () => {
    logout();
    router.replace("/auth/sign-in");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-our-black text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={` h-screen md:h-auto md:flex flex-col md:relative text-white md:w-[250px]
          fixed top-0 left-0 z-50 transition-transform duration-300
          ${
            isSidebarOpen
              ? "translate-y-0 w-screen h-screen"
              : "-translate-y-full md:translate-y-0"
          }
        `}
      >
        {/* Close Button (Mobile Only) */}
        <button
          className="md:hidden absolute top-3 left-4 text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>

        {/* Back Button */}
        <button
          onClick={() => router.push(`/units/${unitId}`)}
          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white hover:text-[#292929] transition-all"
        >
          <Undo size={20} />
          <span>رجوع</span>
        </button>

        {/* User Profile Section */}
        <div className="flex items-center gap-2 px-4 py-3">
          <Avatar>
            {AuthService?.getUser()?.image ? (
              <AvatarImage
                src={AuthService.getUser().image}
                alt="User Avatar"
              />
            ) : (
              <AvatarFallback>
                {AuthService?.getUser()?.name?.slice(0, 2).toUpperCase() ?? ""}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="text-gray-300">
            {AuthService?.getUser()?.name ?? "مستخدم"}
          </span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto mt-4">
          {currentMenuItems.map((item, index) => {
            const sectionNum = index + 1;
            return (
              <button
                key={item.title}
                className={`flex items-center gap-3 px-4 py-2 w-full text-right  hover:bg-white hover:text-[#292929] transition-all ${
                  Number(currentSectionId) === sectionNum
                    ? "bg-white text-[#292929]"
                    : "text-white"
                }`}
                onClick={() => {
                  const updatedParams = new URLSearchParams(
                    searchParams.toString()
                  );
                  updatedParams.set("sectionId", String(sectionNum));
                  router.push(`${pathname}?${updatedParams.toString()}`);
                  setIsSidebarOpen(false); // Close sidebar on mobile
                }}
              >
                <item.icon size={20} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer - Logout */}
        <button
          className="flex items-center gap-3 px-4 py-3 w-full text-right text-red-400 hover:bg-white hover:text-red-500 transition-all"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
