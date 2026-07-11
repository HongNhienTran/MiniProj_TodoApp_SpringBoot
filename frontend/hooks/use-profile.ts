"use client";

import { useEffect, useState } from "react";

import { getProfile } from "@/services/user.service";
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

        loading

    };
}