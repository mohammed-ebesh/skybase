"use client";

import React from "react";
import HomeLayout from "@/app/Layouts/HomeLayout";
import { useSearchParams } from "next/navigation";
import PageTitle from "../shared/pageTitle";
import { units } from "@/utils/units";
import OfficerTable from "./OfficerTable/index";
import AddOfficer from "./AddOfficer/AddOfficer";

function Officers({ unitId }: { unitId: string }) {
  const searchParams = useSearchParams();
  const currentSectionId = searchParams.get("sectionId");

  return (
    <HomeLayout>
      <PageTitle
        link={`/units/${unitId}`}
        title={[unitId ? units[unitId] : "Unknown Unit", "شئون الضباط"]}
      />
      {(!currentSectionId || currentSectionId === "1") && <OfficerTable />}
      {currentSectionId === "8" && <AddOfficer />}
    </HomeLayout>
  );
}

export default Officers;
