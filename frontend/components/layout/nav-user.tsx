"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

import { removeAccessToken } from "@/lib/auth";
import { useProfile } from "@/hooks/use-profile";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavUser() {
  const router = useRouter();

  const { profile } = useProfile();

  const handleLogout = () => {
    removeAccessToken();
    router.replace("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full rounded-lg border p-3 text-left hover:bg-accent">
          <p className="font-semibold">
            {profile?.fullName}
          </p>

          <p className="text-sm text-muted-foreground">
            {profile?.role}
          </p>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}