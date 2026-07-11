"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppHeader } from "@/components/layout/app-header";
import ProtectedRoute from "@/components/auth/protected-route";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
        <SidebarProvider>

            <AppSidebar />

            <SidebarInset>

                <AppHeader />

                <main className="p-6">
                    {children}
                </main>

            </SidebarInset>

        </SidebarProvider>
        </ProtectedRoute>
    );
}