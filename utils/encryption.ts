/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";

const SECRET_KEY = "dfdkf;ds#$%4543llsls!@#443"; 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function encryptData(data: any): string {
    const jsonData = JSON.stringify(data);
    // Encrypt JSON string using AES
    return CryptoJS.AES.encrypt(jsonData, SECRET_KEY).toString();
  }
  
  export function decryptData(encryptedData: string | null): any {
    // If there's nothing to decrypt, return null
    if (!encryptedData) return null;
  
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      // Parse the JSON string back into the original object
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  }