export interface UserProfile {
    id: number;
    fullName: string;
    email: string;
    role: string;
}

export interface UpdateProfileRequest {
  fullName: string;
}