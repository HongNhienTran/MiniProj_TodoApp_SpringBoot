"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useProfile } from "@/hooks/use-profile";

export function AppHeader() {
    const { profile } = useProfile();
    return (
        <header className="flex h-20 items-center justify-between border-b px-6">

            <div className="flex items-center gap-3">

                <SidebarTrigger />

                <h1 className="text-xl font-semibold">

                    Welcome, {profile?.fullName}

                </h1>

            </div>

        </header>
    );
}