"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { useRegister } from "@/hooks/use-auth";
import { RegisterRequest } from "@/types/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm(
  props: React.ComponentProps<typeof Card>
) {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const onSubmit = (data: RegisterRequest) => {
    registerMutation.mutate(data);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>

        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup>

            <Field>
              <FieldLabel htmlFor="fullName">
                Full Name
              </FieldLabel>

              <Input
                id="fullName"
                placeholder="John Doe"
                disabled={registerMutation.isPending}
                {...register("fullName", {
                  required: "Full name is required",
                })}
              />

              {errors.fullName && (
                <FieldDescription className="text-destructive">
                  {errors.fullName.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">
                Email
              </FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                disabled={registerMutation.isPending}
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email ? (
                <FieldDescription className="text-destructive">
                  {errors.email.message}
                </FieldDescription>
              ) : (
                <FieldDescription>
                  We'll use this email to contact you.
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">
                Password
              </FieldLabel>

              <Input
                id="password"
                type="password"
                disabled={registerMutation.isPending}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters",
                  },
                })}
              />

              {errors.password ? (
                <FieldDescription className="text-destructive">
                  {errors.password.message}
                </FieldDescription>
              ) : (
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              )}
            </Field>

            <Field>
              <Button
                type="submit"
                className="w-full"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending
                  ? "Creating..."
                  : "Create Account"}
              </Button>

              <FieldDescription className="mt-4 text-center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium underline underline-offset-4"
                >
                  Sign in
                </Link>
              </FieldDescription>
            </Field>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}