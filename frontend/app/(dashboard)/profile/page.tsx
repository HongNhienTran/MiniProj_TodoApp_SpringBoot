"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { User } from "lucide-react";

import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { useTodos } from "@/hooks/use-todos";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProfileForm {
  fullName: string;
}

export default function ProfilePage() {
  const { profile } = useProfile();

  const updateProfile = useUpdateProfile();

  const { data } = useTodos({
    page: 0,
    size: 1000,
  });

  const todos = data?.content ?? [];

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ProfileForm>();

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName,
      });
    }
  }, [profile, reset]);

  const completed = todos.filter(
    t => t.completed
  ).length;

  const pending = todos.filter(
    t => !t.completed
  ).length;

  const overdue = todos.filter(t => {
    if (!t.dueDate) return false;

    return (
      !t.completed &&
      new Date(t.dueDate) < new Date()
    );
  }).length;

  const onSubmit = (data: ProfileForm) => {
    updateProfile.mutate({
      fullName: data.fullName,
    });
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-muted-foreground">
          Manage your personal information
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <Card className="p-6 flex flex-col items-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>

          <p className="mt-4 text-xl font-semibold">
            {profile?.fullName}
          </p>

          <p className="text-muted-foreground">
            {profile?.email}
          </p>

          <p className="mt-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            {profile?.role}
          </p>

        </Card>

        <Card className="p-6 lg:col-span-2">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>

              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <Input
                {...register("fullName")}
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <Input
                value={profile?.email ?? ""}
                disabled
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Role
              </label>

              <Input
                value={profile?.role ?? ""}
                disabled
              />

            </div>

            <Button
              type="submit"
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>

          </form>

        </Card>

      </div>

      <div className="grid gap-4 md:grid-cols-4">

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">
            Total Tasks
          </p>

          <p className="mt-2 text-3xl font-bold">
            {todos.length}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">
            Completed
          </p>

          <p className="mt-2 text-3xl font-bold">
            {completed}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold">
            {pending}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-muted-foreground">
            Overdue
          </p>

          <p className="mt-2 text-3xl font-bold text-red-500">
            {overdue}
          </p>
        </Card>

      </div>

    </div>
  );
}