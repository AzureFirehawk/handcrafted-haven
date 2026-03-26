"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProductWithSeller } from "@/app/lib/definitions";

export default function ProductGrid({
  initialProducts = [],
}: { initialProducts?: ProductWithSeller[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        switch (sort) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [search, sort, initialProducts]);

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-1/2 rounded-full border border-[#d6c6b8] px-5 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#7a5c46]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort */}
        <select
          className="rounded-full border border-[#d6c6b8] px-5 py-3 bg-white focus:outline-none"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col h-full">
              
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {product.name}
                </h3>

                <p className="mt-2 text-[#8b6f5a] font-medium">
                  ${product.price.toFixed(2)}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <p className="text-center mt-12 text-[#8b6f5a]">
          No products found.
        </p>
      )}
    </>
  );
}