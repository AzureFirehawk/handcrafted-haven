"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProductWithSeller } from "@/app/lib/definitions";

export default function ProductGrid({
  initialProducts = [],
  ratingMap = {},
}: {
    initialProducts?: ProductWithSeller[];
    ratingMap?: Record<string, { average: number;  count: number }>;
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const unique = new Set(initialProducts.map(p => p.category));
    return ["all", ...Array.from(unique)];
  }, [initialProducts]);
const filteredProducts = useMemo(() => {
  return initialProducts
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    })
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
  }, [search, sort, category, initialProducts]);


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

        {/* Category */}
        <select
          className="rounded-full border border-[#d6c6b8] px-5 py-3 bg-white focus:outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
</select>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr">
        {filteredProducts.map((product) => {
          const rating = ratingMap[product.id];

          return (
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
                <div className="mt-2 flex items-center gap-2 text-sm text-[#8b6f5a]">
                  {rating ? (
                    <>
                      <span className="font-semibold">
                        {rating.average}
                      </span>

                      <span>
                        {"⭐".repeat(Math.round(rating.average))}
                      </span>

                      <span className="text-xs">
                        ({rating.count})
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">
                      No reviews yet
                    </span>
                  )}
                </div>
              </div>

            </div>
          </Link>
          )
        })}
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