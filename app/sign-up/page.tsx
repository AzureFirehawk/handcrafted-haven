"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const validate = () => {
    const errors = { name: "", email: "", password: "", confirmPassword: "", role: "" };

    if (!name.trim()) errors.name = "Full name is required.";

    if (!email.trim()) errors.email = "Email is required.";
    else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";

    if (!password) errors.password = "Password is required.";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters.";

    if (!confirmPassword) errors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";

    if (!role) errors.role = "Please select an account type.";

    setFieldErrors(errors);
    return !errors.name && !errors.email && !errors.password && !errors.confirmPassword && !errors.role;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validate()) {
      setError("Please fix the highlighted fields before continuing.");
      return;
    }
    localStorage.setItem(
  "user",
  JSON.stringify({
    name,
    email,
    password,
    role,
  })
);
    setSuccess("Account created successfully! Redirecting...");

    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE0D4] px-4 py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#4A2C2A]">Create Account</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Join Handcrafted Haven today
          </p>
        </div>

        {/* SUCCESS */}
        {success && (
          <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
            {success}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>

          {/* NAME */}
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full Name"
            className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#D6CCC2] ${
              fieldErrors.name ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fieldErrors.name && <p className="text-sm text-red-600">{fieldErrors.name}</p>}

          {/* EMAIL */}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email Address"
            className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#D6CCC2] ${
              fieldErrors.email ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email}</p>}

          {/* PASSWORD */}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#D6CCC2] ${
              fieldErrors.password ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fieldErrors.password && <p className="text-sm text-red-600">{fieldErrors.password}</p>}

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm Password"
            className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#D6CCC2] ${
              fieldErrors.confirmPassword ? "border-red-400" : "border-gray-300"
            }`}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-sm text-red-600">{fieldErrors.confirmPassword}</p>
          )}

          {/* ROLE */}
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#D6CCC2] ${
              fieldErrors.role ? "border-red-400" : "border-gray-300"
            }`}
          >
            <option value="">Select Account Type</option>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
          {fieldErrors.role && <p className="text-sm text-red-600">{fieldErrors.role}</p>}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 mt-2 text-[#4A2C2A] bg-[#D6CCC2] rounded-full hover:bg-[#cbbba9] transition font-semibold shadow-sm"
          >
            Sign Up
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#4A2C2A] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}