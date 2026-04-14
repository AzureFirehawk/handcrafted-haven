"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useEffect } from "react";
import { createUser } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { SignupState } from "@/app/lib/definitions";
import { useFormStatus } from "react-dom";
import Link from "next/link";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-6 w-full rounded-full bg-[#7a5c46] px-6 py-3 text-white font-medium hover:bg-[#624836] transition disabled:opacity-50"
      type="submit"
      disabled={pending}>
      {pending ? "Creating account..." : "Sign Up"}
    </button>
  );
}

export default function SignupForm() {
  const router = useRouter();

  const [state, formAction] = useActionState<SignupState, FormData>(
    createUser,
    {}
  );

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleAction = () => {
    if (!validate()) {
      setFormValues((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
      return;
    }

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);

    formAction(formData);
  };
  const validate = () => {
    const { name, email, password, confirmPassword } = formValues;

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
    return !errors.name && !errors.email && !errors.password && !errors.confirmPassword;
  };

  useEffect(() => {
    if (!state.success) return;

    const timer = setTimeout(() => {
      router.push("/login?signup=success");
    }, 1500);

    return () => clearTimeout(timer);
  }, [state.success, router]);

  return (
    <form
      action={handleAction}
      className="space-y-4"
    >
      {/* TITLE */}
      <h1 className="mb-2 text-2xl font-bold text-[#3e2f25]">
        Create account.
      </h1>
      <p className="mb-6 text-sm text-[#8b6f5a]">
        Join Handcrafted Haven today.
      </p>

      {/* NAME */}
      <div>
        <label className="mb-2 block text-xs font-medium text-[#3e2f25]">
          Full Name
        </label>
        <input
          name="name"
          value={formValues.name}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
          className="block w-full rounded-md border border-[#eadfd3] py-2 px-3 text-sm outline-[#7a5c46] text-stone-900 placeholder:text-gray-400"
          placeholder="Enter your full name"
        />
        {fieldErrors.name && (
          <p className="text-sm text-red-500 mt-1">{fieldErrors.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label className="mb-2 block text-xs font-medium text-[#3e2f25]">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          value={formValues.email}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, email: e.target.value }))
          }
          className="block w-full rounded-md border border-[#eadfd3] py-2 px-3 text-sm outline-[#7a5c46] text-stone-900 placeholder:text-gray-400"
          placeholder="Enter your email"
        />
        {fieldErrors.email && (
          <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <label className="mb-2 block text-xs font-medium text-[#3e2f25]">
          Password
        </label>
        <input
          name="password"
          type="password"
          value={formValues.password}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, password: e.target.value }))
          }
          className="block w-full rounded-md border border-[#eadfd3] py-2 px-3 text-sm outline-[#7a5c46] text-stone-900 placeholder:text-gray-400"
          placeholder="Min. 8 characters"
        />
        {fieldErrors.password && (
          <p className="text-sm text-red-500 mt-1">{fieldErrors.password}</p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label className="mb-2 block text-xs font-medium text-[#3e2f25]">
          Confirm Password
        </label>
        <input
          type="password"
          value={formValues.confirmPassword}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, confirmPassword: e.target.value }))
          }
          className="block w-full rounded-md border border-[#eadfd3] py-2 px-3 text-sm outline-[#7a5c46] text-stone-900 placeholder:text-gray-400"
          placeholder="Re-enter password"
        />
        {fieldErrors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">
            {fieldErrors.confirmPassword}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <SubmitButton />

      {/* SERVER ERROR */}
      {state?.error && (
        <p className="text-sm text-red-500 text-center">{state.error}</p>
      )}

      {/* LOGIN LINK */}
      <div className="text-center text-sm text-gray-600 pt-2">
        Already have an account?{" "}
        <Link href="/login" className="text-[#4A2C2A] font-bold hover:underline">
          Log in
        </Link>
      </div>
    </form>
  );
}