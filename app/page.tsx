"use client";
import { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import UnitsCards from "@/components/Units/UnitsCards";
import { AuthService } from "@/services/AuthService";
import { useFetch } from "@/lib/useFetch";
import { Spinner } from "@/components/ui/Spinner";

// Hashing Function using SHA-256
async function hashData(data: string) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function Units() {
  const { data: UnitsData, isLoading: UnitsDataLoading } =
    useFetch(`/api/v1/units`);
  const user = AuthService.getUser();

  // Extract numeric IDs from `globalPermissions`
  const globalPermissionIds = user?.globalPermissions
    ?.map((permission: string) => {
      const match = permission.match(/\/(\d+)$/); // Extract the numeric ID at the end of the URL
      return match ? match[1] : null;
    })
    .filter(Boolean); // Remove null values

  // Store `globalPermissionIds` securely in localStorage with hashing
  useEffect(() => {
    if (globalPermissionIds.length > 0) {
      const dataToStore = JSON.stringify(globalPermissionIds);
      hashData(dataToStore).then((hashedValue) => {
        localStorage.setItem("globalPermissionIdsHash", hashedValue);
      });
    }
  }, [globalPermissionIds]);

  return (
    <>
      <Navbar />

      {UnitsDataLoading ? (
        // 📌 Loader UI (Centered Spinner)
        <Spinner />
      ) : (
        <UnitsCards
          data={UnitsData?.member ?? []}
          units={globalPermissionIds ?? []}
          loading={UnitsDataLoading}
        />
      )}
    </>
  );
}

export default Units;
