"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import officersManagementLogo from "@/app/assets/badge.png";
import organizationAndManagementLogo from "@/app/assets/rank-badge.png";
import { LogOut, Settings } from "lucide-react";
import { units } from "@/utils/units";

interface UnitSettingsProps {
  params: {
    unitId: string;
  };
}

const UnitSettings: React.FC<UnitSettingsProps> = ({ params }) => {
  const { unitId } = params;
  const router = useRouter();
  const { logout } = useAuth();

  // Example handlers
  const handleBack = () => {
    router.push("/");
  };

  const handleLogout = () => {
    logout();
    router.replace("/auth/sign-in");
  };

  const cards = [
    {
      id: 1,
      name: "شئون الظباط",
      route: `/units/${unitId}/officers?sectionId=1`,
      image: officersManagementLogo,
    },
    {
      id: 2,
      name: "التنظيم والادارة",
      route: `/units/${unitId}/administration?sectionId=1`,
      image: organizationAndManagementLogo,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-[85vh]">
      {/* Unit Title */}
      <div>
        {" "}
        <h1 className="text-center text-lg md:text-2xl font-bold my-4">
          {unitId ? units[unitId] : "Unknown Unit"}
        </h1>
        {/* Cards */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-white">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-our-blue hover:bg-our-darkblue cursor-pointer 
                       flex items-center justify-center 
                       w-full mx-4 md:mx-0 md:w-[300px] h-[200px] rounded-xl"
              onClick={() => router.push(card.route)}
            >
              <div className="flex flex-col items-center justify-center">
                {/* Could use next/image if you prefer */}
                <Image src={card.image} alt={card.name} className="w-[100px]" />
                <p>{card.name}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Back Button */}
        <div className="flex items-center justify-center mt-7">
          <div
            onClick={handleBack}
            className="bg-our-yellow cursor-pointer hover:bg-our-darkyellow 
                     flex items-center rounded-xl text-our-black 
                     px-20 py-4 gap-2"
          >
            <span aria-label="تسجيل الخروج" className="font-semibold text-sm">
              الرجوع للوراء
            </span>
            {/* Your icon */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F5F5F5] border-t border-gray-200 py-4">
        <div className="flex justify-around items-center">
          <div
            className="flex flex-col items-center cursor-pointer text-gray-700 hover:text-gray-900"
            onClick={() => router.push("/admin-dashboard")}
          >
            <Settings className="w-6 h-6" />
            <span className="text-sm font-semibold">لوحة التحكم</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer text-gray-700 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="w-6 h-6" />
            <span className="text-sm font-semibold">تسجيل الخروج</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UnitSettings;
