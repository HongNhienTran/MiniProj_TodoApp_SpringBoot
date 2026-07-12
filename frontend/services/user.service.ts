import api from "@/lib/axios";
import { UserProfile } from "@/types/user";

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/users/me");
  return response.data.data;
};

export const updateProfile = async (
  request: UpdateProfileRequest
): Promise<UserProfile> => {
  const response = await api.put(
    "/users/me",
    request
  );

  return response.data.data;
};