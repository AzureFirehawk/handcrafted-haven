import { fetchProducts } from "@/app/lib/data";
import ProductGrid from "@/app/ui/products/grid";


export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-[#f8f3ee] text-[#3e2f25] px-6 py-16 md:px-16">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Shop Handmade Creations
        </h1>
        <p className="mt-4 text-[#6b5647] max-w-2xl mx-auto">
          Explore unique, artisan-crafted goods from independent makers.
        </p>
      </div>

      {/* Product Grid (Client Component) */}
      <div className="mt-12 max-w-6xl mx-auto">
        <ProductGrid initialProducts={products || []} />
      </div>
    </main>
  );
};