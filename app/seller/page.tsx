import SellerGrid from "@/app/ui/seller/grid";
import { fetchAllSellers } from "@/app/lib/data";

export default async function SellersPage() {
  const sellers = await fetchAllSellers();
  
  return (
    <main className="min-h-screen py-12 px-6 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Our Sellers</h1>
        <SellerGrid initialSellers={sellers} />
      </div>
    </main>
  );
}