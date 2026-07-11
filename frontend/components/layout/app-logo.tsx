"use client";

import Link from "next/link";
import { CheckSquare } from "lucide-react";

export function AppLogo() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2"
    >
      <img
        src="favicon.ico"
        alt="TodoApp Logo"
      />
    </Link>
  );
}