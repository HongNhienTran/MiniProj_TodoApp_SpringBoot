"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getProfile,
  updateProfile,
} from "@/services/user.service";

import { UserProfile } from "@/types/user";

export function useProfile() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();

      setProfile(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    profile,
    loading,
    reloadProfile: loadProfile,
  };
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (fullName: string) =>
      updateProfile({
        fullName,
      }),

    onSuccess: () => {
      toast.success(
        "Profile updated successfully"
      );
    },

    onError: () => {
      toast.error(
        "Update profile failed"
      );
    },
  });
}