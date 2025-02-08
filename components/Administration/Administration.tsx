"use client";
import HomeLayout from "@/app/Layouts/HomeLayout";
import { useSearchParams } from "next/navigation";
import React from "react";
import PageTitle from "../shared/pageTitle";
import { units } from "@/utils/units";
import SoldierTable from "./SoldierTable/index";
import AddSoldier from "./AddSoldier/AddSoldier";
function Administration({ unitId }: { unitId: string }) {
  const searchParams = useSearchParams();
  const currentSectionId = searchParams.get("sectionId");
  return (
    <HomeLayout>
      <PageTitle
        link={`/units/${unitId}`}
        title={[unitId ? units[unitId] : "Unknown Unit", "شئون الضباط"]}
      />
      {(!currentSectionId || currentSectionId === "1") && <SoldierTable />}
      {currentSectionId === "8" && <AddSoldier />}
    </HomeLayout>
  );
}

export default Administration;
