import Link from 'next/link';
 
export default function SiteFooter() {
  return (
<footer className="mt-20 bg-stone-900 text-stone-200">
<div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
<div>
<h3 className="text-2xl font-semibold text-white">
            Handcrafted <span className="italic font-normal text-amber-400">Haven</span>
</h3>
<p className="mt-4 text-sm leading-6 text-stone-300">
            Thoughtfully made décor, gifts, and artisan creations designed to bring
            warmth, beauty, and personality into your home.
</p>
</div>
 
        <div>
<h4 className="mb-4 text-lg font-medium text-white">Quick Links</h4>
<ul className="space-y-2 text-sm">
<li>
<Link href="/" className="hover:text-amber-400">
                Home
</Link>
</li>
<li>
<Link href="/shop" className="hover:text-amber-400">
                Shop
</Link>
</li>
</ul>
</div>
        <div>
          <h4 className="mb-4 text-lg font-medium text-white">Stay Connected</h4>
          <p className="mb-4 text-sm text-stone-300">
                      Get updates on new collections and artisan favorites.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-400"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-amber-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-amber-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
 
      <div className="border-t border-stone-800 px-6 py-4 text-center text-sm text-stone-400">
        © 2026 Handcrafted Haven. All rights reserved.
    </div>
  </footer>
  );
}