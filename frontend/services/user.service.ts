import api from "@/lib/axios";
import { UserProfile } from "@/types/user";

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/users/me");
  return response.data.data;
};