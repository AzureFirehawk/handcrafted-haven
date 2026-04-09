import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchSellerProfile } from "@/app/lib/data";

export default async function SellerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const seller = await fetchSellerProfile(params.id);

  if (!seller) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Seller Header */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="flex-shrink-0">
            <div className="w-56 h-56 rounded-3xl overflow-hidden border-8 border-white shadow-xl bg-gray-200">
              <Image
                src={seller.avatar || "/images/placeholder.jpg"}
                alt={seller.name}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="flex-1 pt-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {seller.name}
            </h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-8 text-sm">
              <span>📍 {seller.location || "Unknown"}</span>
              <span>
                Joined{" "}
                {new Date(seller.joined).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                })}
              </span>
              <span>
                ⭐ {seller.rating} • {seller.productsCount} products
              </span>
            </div>

            <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mb-10">
              {seller.bio || "No bio available."}
            </p>

            <div className="flex gap-4">
              <button className="px-10 py-4 bg-[#8B5A2B] hover:bg-[#6B4420] text-white rounded-full font-medium transition-all">
                Message Seller
              </button>
              <button className="px-10 py-4 border-2 border-gray-400 hover:bg-gray-100 rounded-full font-medium transition-all">
                Follow Shop
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold mb-10 text-gray-900">
            Products by {seller.name.split("'")[0]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seller.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={product.image || "/images/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-medium text-xl mb-3 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-[#8B5A2B] text-2xl font-semibold">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}