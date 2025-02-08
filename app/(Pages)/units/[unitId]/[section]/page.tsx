"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Administration from "@/components/Administration/Administration";
import Officers from "@/components/Officers/Officers";

function UnitsSettings() {
  const params = useParams(); // Get dynamic route params
  const router = useRouter();

  const section = params.section as string;
  const unitId = params.unitId as string;

  // Allowed sections
  const allowedSections = ["officers", "administration"];

  // Redirect if section is invalid
  useEffect(() => {
    if (!allowedSections.includes(section)) {
      router.push("/");
    }
  }, [section, router]);

  return (
    <>
      {section === "officers" && <Officers unitId={unitId} />}
      {section === "administration" && <Administration unitId={unitId} />}
    </>
  );
}

export default UnitsSettings;
