import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut } from '@/auth';

type SiteHeaderProps = {
  userEmail?: string;
};

export default async function SiteHeader({ userEmail }: SiteHeaderProps) {
  const session = await auth();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-stone-800">
              Handcrafted{' '}
              <span className="italic font-normal text-amber-700">Haven</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-stone-700 transition hover:text-amber-700">
              Home
            </Link>
            <Link href="/products" className="text-stone-700 transition hover:text-amber-700">
              Shop
            </Link>
            <Link href="/seller" className="text-stone-700 transition hover:text-amber-700">
              Sellers
            </Link>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <span className="text-sm text-[#8b6f5a]">
                    Artisan: {session.user?.email}
                  </span>
                </Link>

                <form
                  action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                  }}
                >
                  <button className="rounded-full border border-[#7a5c46] px-5 py-1.5 text-sm font-medium transition hover:bg-[#7a5c46] hover:text-white">
                    Log Out
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-[#7a5c46] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#624836]"
              >
                Log In
              </Link>
            )}
          </div>

          <details className="relative md:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-[#7a5c46] text-[#7a5c46] transition hover:bg-[#7a5c46] hover:text-white">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>

            <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-stone-200 bg-white p-4 shadow-lg">
              <nav className="flex flex-col gap-3">
                <Link href="/" className="rounded-lg px-3 py-2 text-stone-700 hover:bg-stone-100 hover:text-amber-700">
                  Home
                </Link>
                <Link href="/products" className="rounded-lg px-3 py-2 text-stone-700 hover:bg-stone-100 hover:text-amber-700">
                  Shop
                </Link>
                <Link href="/seller" className="rounded-lg px-3 py-2 text-stone-700 hover:bg-stone-100 hover:text-amber-700">
                  Sellers
                </Link>
                <div className="my-2 border-t border-stone-200" />
                {session ? (
                  <>
                    <Link href="/profile">
                      <span className="px-3 text-sm text-[#8b6f5a]">
                        Artisan: {session.user?.email}
                      </span>
                    </Link>
                    <form
                      action={async () => {
                        'use server';
                        await signOut({ redirectTo: '/' });
                      }}
                    >
                      <button className="mt-2 w-full rounded-full border border-[#7a5c46] px-5 py-2 text-sm font-medium text-[#7a5c46] transition hover:bg-[#7a5c46] hover:text-white">
                        Log Out
                      </button>
                    </form>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-full bg-[#7a5c46] px-5 py-2 text-center text-sm font-medium text-white transition hover:bg-[#624836]"
                  >
                    Log In
                  </Link>
                )}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}