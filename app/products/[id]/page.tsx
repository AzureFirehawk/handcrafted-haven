import Link from "next/link";
import { fetchProductById } from "@/app/lib/data";


export default async function ProductPage({ params }: any) {
  const { id } = await params;

  const product = await fetchProductById(id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f8f3ee]">
        <p className="text-xl text-[#6b5647]">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f3ee] text-[#3e2f25] px-6 py-16 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        <Link
          href="/products"
          className="text-[#8b6f5a] hover:underline mb-8 inline-block"
        >
          ← Back to Products
        </Link>

        <div className="grid gap-12 md:grid-cols-2">
          
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-lg"
          />

          <div className="flex flex-col">
            {product.category && (
              <p className="uppercase text-sm tracking-wide text-[#8b6f5a]">
                {product.category}
              </p>
            )}

            <h1 className="mt-2 text-3xl md:text-4xl font-bold">
              {product.name}
            </h1>

            <div className="mt-2">
              <Link
                href={`/seller/${product.seller_id}`}
                className="text-[#8b6f5a] hover:underline"
              >
                Sold by {product.seller_name}
              </Link>
            </div>

            <p className="mt-4 text-2xl font-semibold text-[#7a5c46]">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-6 text-[#5f4a3a] leading-7">
              {product.description ||
                "This handcrafted item is made with care and attention to detail."}
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-full bg-[#7a5c46] px-6 py-3 text-white hover:bg-[#624836] transition">
                Buy Now
              </button>

              <Link
                href={`/seller/${product.seller_id}`}
                className="rounded-full border border-[#7a5c46] px-6 py-3 hover:bg-white transition inline-block text-center"
              >
                View Seller
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}