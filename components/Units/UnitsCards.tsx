"use client";
import { useAuth } from "@/context/AuthContext";
import { Building, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

// Define Types for Props
interface Unit {
  id: number;
  name: string;
}

interface HomeProps {
  data: Unit[]; // Array of units
  units: number[] | string[]; // IDs (from API or local storage)
  loading: boolean;
}

export default function Home({ data, units, loading }: HomeProps) {
  const { logout } = useAuth(); // Get logout function
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/auth/sign-in"); // Redirect after logout
  };

  // Ensure `units` is an array of numbers
  const allowedUnitIds = units.map(Number);

  // Filter `data` to include only units whose `id` is in `allowedUnitIds`
  const filteredUnits = data.filter((unit) => allowedUnitIds.includes(unit.id));

  console.log("Allowed Unit IDs:", allowedUnitIds);
  console.log("Filtered Units:", filteredUnits);

  return (
    <div dir="rtl" className="flex flex-col h-[85vh]">
      {/* Header */}
      <h1 className="text-center text-lg md:text-2xl font-bold my-4">
        الوحدات
      </h1>

      {/* Cards or Placeholder */}
      <div className="flex-grow">
        {loading ? (
          <div>Loading...</div>
        ) : filteredUnits.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>لا توجد وحدات متاحة حالياً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-our-blue cursor-pointer flex flex-col items-center justify-center hover:bg-our-darkblue h-[100px] md:h-[200px] rounded-xl text-white"
                onClick={() => router.push(`/units/${unit.id}`)}
              >
                <Building className="w-8 h-8 mb-2" />
                <p>{unit.name}</p>
              </div>
            ))}
          </div>
        )}
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
}
