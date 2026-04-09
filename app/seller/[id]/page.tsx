'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SellerProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Seller {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  joined: string;
  productsCount: number;
  rating: number;
  products: SellerProduct[];
}

const mockSellers: Record<string, Seller> = {
  '1': {
    id: '1',
    name: "Mama Sarah's Crafts",
    avatar: "/images/mama-sarah.jpg",
    bio: "Proud Kampala artisan specializing in handmade basket weaving, pottery, and recycled fabric home decor. I source materials locally from Ugandan markets and create pieces that celebrate our rich cultural heritage.",
    location: "Kampala, Uganda",
    joined: "January 2025",
    productsCount: 37,
    rating: 4.8,
    products: [
      { id: 101, name: "Woven Kisii Basket Set", price: 65000, image: "/images/woven-basket-kisii.jpg" },
      { id: 102, name: "Handmade Ceramic Coffee Mug", price: 28000, image: "/images/ceramic-coffee-mug.jpg" },
      { id: 103, name: "Recycled Fabric Wall Hanging", price: 45000, image: "/images/recycled-fabric-wall-hanging.jpg" }
    ]
  },
  '2': {
    id: '2',
    name: "Bap Craft Studio",
    avatar: "/images/bap-craft.jpg",
    bio: "Creative studio specializing in unique handmade crafts and modern designs. We blend traditional techniques with contemporary aesthetics to create one-of-a-kind pieces that brighten your home.",
    location: "Kampala, Uganda",
    joined: "March 2025",
    productsCount: 24,
    rating: 4.6,
    products: [
      { id: 201, name: "Decorative Craft Piece", price: 42000, image: "/images/bap-craft.jpg" },
      { id: 202, name: "Modern Handmade Vase", price: 50000, image: "/images/modern-handmade-vase.jpg" }
    ]
  },
  
  '3': {
    id: '3',
    name: "Artisan Wooden Creations",
    avatar: "/images/snowman-figurine.webp",
    bio: "Specializing in hand-carved wooden sculptures, vases, and decorative figurines made from sustainable local wood in Kampala.",
    location: "Kampala, Uganda",
    joined: "February 2025",
    productsCount: 19,
    rating: 4.7,
    products: [
      { id: 301, name: "Snowman Figurine", price: 35000, image: "/images/snowman-figurine.webp" },
      { id: 302, name: "Hand-Carved Wooden Vase", price: 48000, image: "/images/wooden-vase.webp" }
    ]
  }
};

export default function SellerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showFollowSuccess, setShowFollowSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Unwrap params safely in client component
  useEffect(() => {
    params.then((resolved) => {
      setSellerId(resolved.id);
    });
  }, [params]);

  const seller = sellerId ? mockSellers[sellerId] : null;

  if (!seller) {
    return <div className="min-h-screen flex items-center justify-center">Loading seller profile...</div>;
  }

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✅ Message sent successfully to ${seller.name}!\n\nThey will reply to you soon.`);
    setShowMessageModal(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleFollow = () => {
    setShowFollowSuccess(true);
    setTimeout(() => setShowFollowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Seller Header */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-shrink-0">
            <div className="w-56 h-56 rounded-3xl overflow-hidden border-8 border-white shadow-xl bg-gray-200">
              <Image 
                src={seller.avatar} 
                alt={seller.name}
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          <div className="flex-1 pt-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{seller.name}</h1>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-8 text-sm">
              <span>📍 {seller.location}</span>
              <span>Joined {seller.joined}</span>
              <span>⭐ {seller.rating} • {seller.productsCount} products</span>
            </div>

            <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mb-10">
              {seller.bio}
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowMessageModal(true)}
                className="px-10 py-4 bg-[#8B5A2B] hover:bg-[#6B4420] text-white rounded-full font-medium transition-all"
              >
                Message {seller.name.split("'")[0]}
              </button>
              <button 
                onClick={handleFollow}
                className="px-10 py-4 border-2 border-gray-400 hover:bg-gray-100 rounded-full font-medium transition-all"
              >
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
                    src={product.image} 
                    alt={product.name}
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-xl mb-3 line-clamp-2">{product.name}</h3>
                  <p className="text-[#8B5A2B] text-2xl font-semibold">
                    UGX {product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6">Message {seller.name.split("'")[0]}</h2>
            
            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B5A2B]"
                required
              />
              <input
                type="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B5A2B]"
                required
              />
              <textarea
                placeholder="Write your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B5A2B] resize-y"
                required
              />

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 py-3 border border-gray-400 rounded-full font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#8B5A2B] text-white rounded-full font-medium hover:bg-[#6B4420]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Follow Success Toast */}
      {showFollowSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-700 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50">
          <span className="text-2xl">✅</span>
          You are now following <strong>{seller.name}</strong>!
        </div>
      )}
    </div>
  );
}