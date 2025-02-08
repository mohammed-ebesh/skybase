"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { AppSidebar } from "@/components/shared/Sidebar";
import { Menu, X } from "lucide-react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="h-screen grid grid-cols-[1fr] md:grid-cols-[250px_1fr]"
    >
      {/* Fixed Sidebar - Mobile Fullscreen / Desktop 250px */}
      <aside
        className={`fixed top-0 right-0 h-screen bg-[#292929] md:relative md:w-[250px] transition-all duration-300 z-50
          ${isSidebarOpen ? "w-screen" : "w-0"} md:block
        `}
      >
        <AppSidebar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col w-full h-screen">
        {/* Navbar */}
        <header className="w-full">
          <Navbar />
          {/* Mobile Sidebar Toggle Button */}
          {!isSidebarOpen && (
            <button
              className="md:hidden fixed top-4 right-4 z-50 bg-[#292929] text-white p-2 rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          )}
        </header>

        {/* Content Area (Scrollable) */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Overlay (Closes Sidebar) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Close Button for Sidebar (Mobile) */}
      {isSidebarOpen && (
        <button
          className="fixed top-4 left-4 md:hidden z-50 text-white bg-[#292929] p-2 rounded-md"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      )}
    </div>
  );
};

export default HomeLayout;
