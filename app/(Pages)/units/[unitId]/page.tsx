"use client";
import Navbar from "@/components/shared/Navbar";
import UnitSettings from "@/components/UnitSettings/UnitSettings";
import { useParams } from "next/navigation";

function UnitsSettings() {
  const params = useParams() as { unitId: string }; // Explicitly cast the type

  return (
    <>
      <Navbar />
      <UnitSettings params={{ unitId: String(params.unitId) }} />
    </>
  );
}

export default UnitsSettings;
