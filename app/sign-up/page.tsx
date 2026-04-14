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

    localStorage.setItem("mockRole", role);

    setSuccess("Account created successfully! Redirecting...");

    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFE6] px-4 py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-[#6F1D1B]/10">

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
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] transition ${
                fieldErrors.name ? "border-red-400" : "border-gray-300"
              }`}
            />
            {fieldErrors.name && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@example.com"
              className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] transition ${
                fieldErrors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] transition ${
                fieldErrors.password ? "border-red-400" : "border-gray-300"
              }`}
            />
            {fieldErrors.password && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] transition ${
                fieldErrors.confirmPassword ? "border-red-400" : "border-gray-300"
              }`}
            />
            {fieldErrors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* ROLE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className={`w-full px-4 py-2.5 rounded-md border bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] transition ${
                fieldErrors.role ? "border-red-400" : "border-gray-300"
              }`}
            >
              <option value="">Select an option</option>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
            {fieldErrors.role && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.role}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 mt-2 text-white bg-[#6F1D1B] rounded-md hover:bg-[#5a1716] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-[#6F1D1B] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}