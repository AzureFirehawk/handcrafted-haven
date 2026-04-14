"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // 👉 Replace with backend API later
    setMessage("Password reset successful!");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  if (!token) {
    return <p className="text-center mt-10">Invalid or expired link.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE0D4] px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">

        <h2 className="text-2xl font-bold text-center text-[#4A2C2A]">
          Reset Password
        </h2>

        {message && (
          <div className="text-sm text-green-600 text-center">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          <button className="w-full py-3 bg-[#D6CCC2] text-[#4A2C2A] rounded-md font-semibold">
            Reset Password
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center">
          Resetting password for: {email}
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}