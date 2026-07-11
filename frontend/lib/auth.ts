import { ACCESS_TOKEN } from "@/constants/storage";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN);
}

export function setAccessToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN, token);
}

export function removeAccessToken() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN);
}

export function isAuthenticated() {
  return !!getAccessToken();
}