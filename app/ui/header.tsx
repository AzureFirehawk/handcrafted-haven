import Link from 'next/link';
import { auth, signOut } from '@/auth';
 
type SiteHeaderProps = {
  userEmail?: string;
};
 
export default async function SiteHeader({ userEmail }: SiteHeaderProps) {
  const session = await auth();
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-3xl font-semibold text-stone-800">
          Handcrafted <span className="italic font-normal text-amber-700">Haven</span>
        </Link>
 
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-stone-700 transition hover:text-amber-700">
            Home
          </Link>
          <Link href="/products" className="text-stone-700 transition hover:text-amber-700">
            Shop
          </Link>
          <Link
            href="/seller"
            className="text-stone-700 transition hover:text-amber-700"
          >
            Sellers
          </Link>
          <Link href="/about" className="text-stone-700 transition hover:text-amber-700">
            About
          </Link>
          <Link href="/contact" className="text-stone-700 transition hover:text-amber-700">
            Contact
          </Link>
        </nav>
 
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/profile" 
                className="hidden md:block text-sm text-[#8b6f5a] hover:text-[#7a5c46] hover:underline transition"
              >
                Artisan: <span className="font-semibold">{session.user?.email}</span>
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button className="rounded-full border border-[#7a5c46] px-5 py-1.5 text-sm font-medium hover:bg-[#7a5c46] hover:text-white transition">
                  Log Out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-[#7a5c46] px-6 py-2 text-sm font-medium text-white hover:bg-[#624836] transition"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}