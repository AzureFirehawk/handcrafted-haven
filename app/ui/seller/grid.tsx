"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";

interface Seller {
  id: string;
  name: string;
  avatar?: string;
  location?: string;
  rating?: number;
  productsCount?: number;
}

interface SellerGridProps {
  initialSellers?: Seller[];
}

export default function SellerGrid({ initialSellers = [] }: SellerGridProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredSellers = useMemo(() => {
    return initialSellers
      .filter((seller) =>
        seller.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        switch (sort) {
          case "name":
            return a.name.localeCompare(b.name);
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          default:
            return 0;
        }
      });
  }, [search, sort, initialSellers]);

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <input
          type="text"
          placeholder="Search sellers..."
          className="w-full md:w-1/2 rounded-full border border-[#d6c6b8] px-5 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#7a5c46]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded-full border border-[#d6c6b8] px-5 py-3 bg-white focus:outline-none"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="name">Name (A-Z)</option>
          <option value="rating">Rating (High → Low)</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
        {filteredSellers.map((seller) => (
          <Link
            key={seller.id}
            href={`/seller/${seller.id}`}
            className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col h-full"
          >
            <div className="relative h-56 bg-gray-100">
              <Image
                src={seller.avatar || "/images/placeholder.jpg"}
                alt={seller.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{seller.name}</h3>
                {seller.location && (
                  <p className="mt-1 text-[#8b6f5a] text-sm">{seller.location}</p>
                )}
              </div>

              <div className="mt-3 text-sm text-gray-600">
                ⭐ {seller.rating?.toFixed(1) || "N/A"} • {seller.productsCount || 0} products
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredSellers.length === 0 && (
        <p className="text-center mt-12 text-[#8b6f5a]">
          No sellers found.
        </p>
      )}
    </>
  );
}