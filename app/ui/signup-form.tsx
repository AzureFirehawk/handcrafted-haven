"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useEffect } from "react";
import { createUser } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { success } from "zod";
import { SignupState } from "@/app/lib/definitions";
import { create } from "domain";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function SignupForm() {
  const router = useRouter();

  const [state, formAction] = useActionState<SignupState, FormData>(
    createUser,
    {}
  );

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const errors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name?.trim()) errors.name = "Full name is required.";

    if (!email?.trim()) errors.email = "Email is required.";
    else if (!isValidEmail(email)) errors.email = "Invalid email.";

    if (!password) errors.password = "Password required.";
    else if (password.length < 8) errors.password = "Min 8 characters.";

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);

    useEffect(() => {
      if (state.success) {
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    }, [state, router]);
    return !errors.name && !errors.email && !errors.password && !errors.confirmPassword;
  };

  return (
    <form
      action={async (formData) => {
        if (!validate(formData)) return;
        formAction(formData);
      }}
      className="space-y-4"
    >
      <input name="name" placeholder="Full Name" />
      {fieldErrors.name && <p>{fieldErrors.name}</p>}

      <input name="email" type="email" placeholder="Email" />
      {fieldErrors.email && <p>{fieldErrors.email}</p>}

      <input name="password" type="password" placeholder="Password" />
      {fieldErrors.password && <p>{fieldErrors.password}</p>}

      <input name="confirmPassword" type="password" placeholder="Confirm Password" />
      {fieldErrors.confirmPassword && <p>{fieldErrors.confirmPassword}</p>}

      <button type="submit">Sign Up</button>

      {/* Error and Success Messages */}      
      {state?.error && (
        <p className="text-red-600 text-sm">{state.error}</p>
      )}

      {state?.success && (
        <p className="text-green-600 text-sm">
          Account created successfully! Redirecting...
        </p>
      )}
    </form>
  );
}