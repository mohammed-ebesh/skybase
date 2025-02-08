/* eslint-disable @typescript-eslint/no-unused-vars */
// AuthService.ts
import Cookies from "js-cookie";
import { encryptData, decryptData } from "@/utils/encryption"; // adjust path

export const AuthService = {
  isAuthenticated() {
    return !!Cookies.get("auth_token");
  },

  login: async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the token in a cookie
        Cookies.set("auth_token", result.token, {
          expires: new Date(result.expires_at),
          secure: true,
          sameSite: "Strict",
        });

        // Encrypt the user data and store in localStorage
        const encryptedUser = encryptData(result.admin);
        localStorage.setItem("auth_user", encryptedUser);

        return { success: true };
      } else {
        return { success: false, message: "خطأ في تسجيل الدخول، تحقق من البيانات" };
      }
    } catch (error) {
      return { success: false, message: "حدث خطأ أثناء تسجيل الدخول" };
    }
  },

  logout() {
    Cookies.remove("auth_token");
    localStorage.removeItem("auth_user");
    window.location.href = "/auth/sign-in";
  },

  getUser() {
    // Retrieve the encrypted user from localStorage
    const encryptedData = localStorage.getItem("auth_user");
    // Decrypt to get the original user object
    return decryptData(encryptedData);
  },
};
