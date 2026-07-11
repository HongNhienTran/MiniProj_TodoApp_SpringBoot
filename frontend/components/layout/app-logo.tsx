"use client";

import Link from "next/link";
import { CheckSquare } from "lucide-react";

export function AppLogo() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2"
    >
      <CheckSquare className="h-6 w-6 text-primary" />

      <span className="text-lg font-bold">
        TodoApp
      </span>
    </Link>
  );
}