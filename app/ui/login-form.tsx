'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-b-2xl bg-white px-6 pb-4 pt-8 shadow-md">
        <h1 className="mb-3 text-2xl font-bold text-[#3e2f25]">
          Welcome back.
        </h1>
        <p className="mb-6 text-sm text-[#8b6f5a]">Please log in to your artisan account.</p>
        
        <div className="w-full">
          <div>
            <label className="mb-2 mt-5 block text-xs font-medium text-[#3e2f25]" htmlFor="email">
              Email Address
            </label>
            <input
              className="block w-full rounded-md border border-[#eadfd3] py-2 px-3 text-sm outline-[#7a5c46] placeholder:text-gray-400"
              id="email" type="email" name="email" placeholder="Enter your email" required
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 mt-5 block text-xs font-medium text-[#3e2f25]" htmlFor="password">
              Password
            </label>
            <input
              className="block w-full rounded-md border border-[#eadfd3] py-2 px-3 text-sm outline-[#7a5c46] placeholder:text-gray-400"
              id="password" type="password" name="password" placeholder="Min. 6 characters" required minLength={6}
            />
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        
        <button 
          className="mt-6 w-full rounded-full bg-[#7a5c46] px-6 py-3 text-white font-medium hover:bg-[#624836] transition disabled:opacity-50"
          aria-disabled={isPending}
          disabled={isPending}
        >
          {isPending ? 'Logging in...' : 'Log in'}
        </button>

        <div className="flex h-8 items-end space-x-1" aria-live="polite">
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}