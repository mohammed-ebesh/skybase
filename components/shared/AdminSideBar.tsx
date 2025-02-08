"use client";
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Undo,
  ChartNoAxesCombined,
  Stethoscope,
  UserPlus,
  SquareLibrary,
  ArrowUpDown,
  TableProperties,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Define menu items
const officersItems = [
  { title: "جدول الضباط", url: "#", icon: TableProperties },
  { title: "تمام الضباط", url: "#", icon: Home },
  { title: "النوبتجيات", url: "#", icon: Calendar },
  { title: "المأموريات", url: "#", icon: Inbox },
  { title: "النماذج والتقارير", url: "#", icon: ChartNoAxesCombined },
  { title: "المواقف الطبية", url: "#", icon: Stethoscope },
  { title: "مواقف متنوعة", url: "#", icon: SquareLibrary },
  { title: "إنشاء كرت ظابط", url: "#", icon: UserPlus },
];

const organizationAndManagementItems = [
  { title: "جدول صف الضباط", url: "#", icon: TableProperties },
  { title: "تمام ضباط الصف", url: "#", icon: Home },
  { title: "النوبتجيات", url: "#", icon: Calendar },
  { title: "المأموريات", url: "#", icon: Inbox },
  { title: "المواقف الطبية", url: "#", icon: Stethoscope },
  { title: "لجان التسليم والتسلم", url: "#", icon: ArrowUpDown },
  { title: "بيانات النموذج", url: "#", icon: SquareLibrary },
  { title: "إضافة صف ضابط", url: "#", icon: UserPlus },
];

function AppSidebar() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageTitle = pathname.split("/")[1];
  const sectionId = searchParams.get("sectionId");
  const unitId = searchParams.get("unitId");

  // Logout function
  const handleLogout = () => {
    logout();
    router.replace("/auth/sign-in"); // Redirect to sign-in page
  };

  // Choose menu items based on the page
  const menuItems =
    pageTitle === "organizationAndManagement"
      ? organizationAndManagementItems
      : officersItems;

  // Handle menu item click and update sectionId in the URL
  const handleMenuItemClick = (index: number) => {
    const newSectionId = index + 1; // sectionId is index + 1
    router.push(`${pathname}?unitId=${unitId}&sectionId=${newSectionId}`);
  };

  return (
    <SidebarProvider>
      <Sidebar side="right">
        <SidebarHeader>
          {/* Arabic Back Button */}
          <SidebarMenuButton
            onClick={() => router.push(`/unitssettings/${unitId}`)}
            className="flex items-center gap-2 text-white p-2"
            aria-label="رجوع"
          >
            <Undo className="w-5 h-5 mt-1" />
            <span className="py-1">رجوع</span>
          </SidebarMenuButton>

          {/* User Info */}
          <SidebarGroupContent className="flex items-center p-2 gap-2">
            <Avatar>
              <AvatarImage src="#" alt="User Avatar" />
              <AvatarFallback>أش</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h1>أحمد شفيق</h1>
              <p className="text-xs">مدير النظام</p>
            </div>
          </SidebarGroupContent>
        </SidebarHeader>

        <SidebarContent className="hide-scroll-bar">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 mt-8 text-white">
                {menuItems.map((item, index) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        handleMenuItemClick(index); // Update URL with sectionId
                      }}
                      isActive={Number(sectionId) === index + 1} // Highlight active item
                      className="flex items-center gap-2"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-[18px] p-1">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="text-white">
          <SidebarMenuButton
            className="flex items-center gap-2 text-[18px] p-2"
            onClick={handleLogout}
          >
            <span aria-label="تسجيل الخروج">تسجيل الخروج</span>
            <LogOut className="w-5 h-5 mt-1" />
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
export default AppSidebar;
