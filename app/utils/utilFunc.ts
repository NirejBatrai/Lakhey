import { jwtDecode } from "jwt-decode";

export const getProfileFromToken = (): UserPayload => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  return jwtDecode(token);
};

export const getToken = (): string => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  return token;
};

export const setProfileFromToken = (token: string): UserPayload => {
  localStorage.setItem("token", token);
  return jwtDecode(token);
};

export type UserPayload = {
  user_id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN"; // Assuming role can be either USER or ADMIN
  iat: number; // Issued at (usually a Unix timestamp)
  exp: number; // Expiry (usually a Unix timestamp)
};
