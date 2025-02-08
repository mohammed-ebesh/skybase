"use client";
import Image from "next/image";
import SignalOfficersLogo from "@/app/assets/20190409_132242.png";
import AirForceLogo from "@/app/assets/EAForce.png";
import ArmyLogo from "@/app/assets/armyLogo.png";

function Navbar() {
  return (
    <div dir="rtl" className="w-full bg-[#F5F5F5] shadow-sm border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 md:py-3">
        {/* Left Logo */}
        <Image
          src={SignalOfficersLogo}
          alt="Signal Officers Logo"
          width={80}
          height={80}
          className="w-[45px] h-auto md:w-[80px] object-contain"
        />
        {/* Center Content */}
        <div className="flex flex-col items-center text-center">
          <Image
            src={ArmyLogo}
            alt="Army Logo"
            width={70}
            height={70}
            className="w-[50px] md:w-[70px] object-contain"
          />
          <span className="text-xs md:text-sm text-[#3d3d3d] font-bold leading-tight">
            القيادة العامة للجيش والقوات المسلحة
          </span>
        </div>

        {/* Right Logo */}
        <Image
          src={AirForceLogo}
          alt="Air Force Logo"
          width={70}
          height={70}
          className="w-[45px] h-auto md:w-[70px] object-contain"
        />
      </div>
    </div>
  );
}

export default Navbar;
