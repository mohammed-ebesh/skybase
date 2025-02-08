"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
/* import Navbar from "@/components/shared/Navbar";
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated === null) return; // ✅ Wait until auth state is loaded

    if (!isAuthenticated && pathname !== "/auth/sign-in") {
      router.replace("/auth/sign-in");
    } else if (isAuthenticated && pathname === "/auth/sign-in") {
      router.replace("/");
    }
  }, [isAuthenticated, pathname, router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading authentication...</p>
      </div>
    );
  }

  return (
    <>
      {/*   {isAuthenticated && pathname !== "/auth/sign-in" && <Navbar />} */}
      {children}
    </>
  );
};

export default ProtectedRoute;
