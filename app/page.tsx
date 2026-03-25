import { auth, signOut } from '@/auth';
import Link from 'next/link';

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-[#f8f3ee] text-[#3e2f25]">
      {/* Nav bar / Usser */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm md:px-16">
        <div className="text-xl font-bold text-[#7a5c46]">
          Handcrafted <span className="font-light italic text-[#8b6f5a]">Heaven</span>
        </div>
        
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-sm text-[#8b6f5a]">
                Artisan: {session.user?.email}
              </span>
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
      </nav>
      {/* Hero Section */}
<section className="bg-[#eadfd3] px-6 py-20 md:px-16">
<div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
<div>
<p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#8b6f5a]">
              Handmade with love
</p>
<h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Beautiful handcrafted pieces for everyday living
</h1>
<p className="mt-6 text-lg text-[#5f4a3a] max-w-xl">
              Discover thoughtfully made home décor, gifts, and artisan creations
              designed to bring warmth, personality, and charm into your space.
</p>
<div className="mt-8 flex flex-wrap gap-4">
<a
                href="#shop"
                className="rounded-full bg-[#7a5c46] px-6 py-3 text-white font-medium hover:bg-[#624836] transition"
>
                Shop Collection
</a>
<a
                href="#story"
                className="rounded-full border border-[#7a5c46] px-6 py-3 font-medium hover:bg-white transition"
>
                Our Story
</a>
</div>
</div>
 
          <div className="flex justify-center">
<img
              src="https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80"
              alt="Handcrafted products on display"
              className="w-full max-w-md rounded-3xl shadow-lg object-cover"
            />
</div>
</div>
</section>
 
      {/* Featured Section */}
<section id="shop" className="px-6 py-16 md:px-16">
<div className="mx-auto max-w-6xl">
<h2 className="text-3xl md:text-4xl font-bold text-center">
            Featured Collections
</h2>
<p className="mt-4 text-center text-[#6b5647] max-w-2xl mx-auto">
            Browse our carefully crafted pieces made to celebrate creativity,
            comfort, and timeless design.
</p>
 
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Home Décor",
                text: "Unique accents that add warmth and personality to your home.",
                img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Handmade Gifts",
                text: "Thoughtful gifts for birthdays, holidays, and special moments.",
                img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Seasonal Creations",
                text: "Limited collections inspired by the beauty of every season.",
                img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
              },
            ].map((item) => (
<div
                key={item.title}
                className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition"
>
<img
                  src={item.img}
                  alt={item.title}
                  className="h-64 w-full object-cover"
                />
<div className="p-6">
<h3 className="text-2xl font-semibold">{item.title}</h3>
<p className="mt-3 text-[#6b5647]">{item.text}</p>
</div>
</div>
            ))}
</div>
</div>
</section>
 
      {/* Story Section */}
<section id="story" className="bg-white px-6 py-16 md:px-16">
<div className="mx-auto max-w-5xl text-center">
<h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
<p className="mt-6 text-lg text-[#5f4a3a] leading-8">
            At Handcrafted Haven, every item is made with care, creativity, and
            attention to detail. We believe handmade products tell a story —
            one of artistry, passion, and connection. Our mission is to bring
            meaningful, one-of-a-kind pieces into homes and lives everywhere.
</p>
</div>
</section>
 
      {/* Why Choose Us */}
<section className="px-6 py-16 md:px-16 bg-[#f3ebe3]">
<div className="mx-auto max-w-6xl">
<h2 className="text-3xl md:text-4xl font-bold text-center">
            Why Choose Us
</h2>
 
          <div className="mt-12 grid gap-8 md:grid-cols-3 text-center">
<div className="rounded-2xl bg-white p-8 shadow">
<h3 className="text-xl font-semibold">Authentically Handmade</h3>
<p className="mt-3 text-[#6b5647]">
                Every piece is created with intention, care, and artisan skill.
</p>
</div>
 
            <div className="rounded-2xl bg-white p-8 shadow">
<h3 className="text-xl font-semibold">Quality Materials</h3>
<p className="mt-3 text-[#6b5647]">
                We use beautiful, durable materials selected for both style and longevity.
</p>
</div>
 
            <div className="rounded-2xl bg-white p-8 shadow">
<h3 className="text-xl font-semibold">Made to Inspire</h3>
<p className="mt-3 text-[#6b5647]">
                Our creations are designed to make everyday spaces feel special.
</p>
</div>
</div>
</div>
</section>
 
      {/* Testimonial */}
<section className="px-6 py-16 md:px-16 bg-white">
<div className="mx-auto max-w-3xl text-center">
<h2 className="text-3xl md:text-4xl font-bold">What Customers Say</h2>
<blockquote className="mt-8 text-xl italic text-[#5f4a3a] leading-8">
            “The craftsmanship is absolutely beautiful. You can feel the care
            and love that goes into every product. My order made my home feel
            so much more personal and welcoming.”
</blockquote>
<p className="mt-4 font-medium text-[#8b6f5a]">— Happy Customer</p>
</div>
</section>
 
      {/* CTA */}
<section className="bg-[#7a5c46] px-6 py-16 text-center text-white">
<h2 className="text-3xl md:text-4xl font-bold">
          Bring handmade beauty into your home
</h2>
<p className="mt-4 text-lg text-[#f3e9df]">
          Explore our latest collection and find something truly special.
</p>
<a
          href="#shop"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-[#7a5c46] hover:bg-[#f5ede6] transition"
>
          Start Shopping
</a>
</section>
</main>
  );
}