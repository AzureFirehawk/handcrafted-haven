'use client';

import { useState } from 'react';
import Image from 'next/image';

const sellers = [
  {
    id: 1,
    name: "Mama Sarah's Crafts",
    avatar: "/images/mama-sarah.jpg",
    bio: "Proud Kampala artisan specializing in handmade basket weaving, pottery, and recycled fabric home decor.",
    location: "Kampala, Uganda",
    joined: "January 2025",
    rating: 4.8,
    productsCount: 37,
    products: [
      { name: "Woven Kisii Basket Set", price: 65000, image: "/images/woven-basket-kisii.jpg" },
      { name: "Handmade Ceramic Coffee Mug", price: 28000, image: "/images/ceramic-coffee-mug.jpg" },
    ]
  },
  {
    id: 2,
    name: "Bap Craft Studio",
    avatar: "/images/bap-craft.jpg",
    bio: "Creative studio specializing in unique handmade crafts and modern designs.",
    location: "Kampala, Uganda",
    joined: "March 2025",
    rating: 4.6,
    productsCount: 24,
    products: [
      { name: "Decorative Craft Piece", price: 42000, image: "/images/bap-craft.jpg" },
    ]
  },
  {
    id: 3,
    name: "OIP Craft Collection",
    avatar: "/images/OIP-craft.webp",
    bio: "High-quality handmade items with excellent craftsmanship and attention to detail.",
    location: "Kampala, Uganda",
    joined: "February 2025",
    rating: 4.9,
    productsCount: 31,
    products: [
      { name: "Premium Handcrafted Item", price: 55000, image: "/images/OIP-craft.webp" },
    ]
  },
  {
    id: 4,
    name: "Amigurumi Angel",
    avatar: "/images/amigurumi-angel.webp",
    bio: "Specializing in adorable handmade amigurumi dolls and soft toys.",
    location: "Kampala, Uganda",
    joined: "April 2025",
    rating: 4.95,
    productsCount: 42,
    products: [
      { name: "Amigurumi Angel Doll", price: 38000, image: "/images/Amigurumi-Angel.jpg" },
    ]
  }
];

export default function SellerProfile2() {
  const [selectedSeller, setSelectedSeller] = useState(sellers[0]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showFollowSuccess, setShowFollowSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✅ Message sent successfully to ${selectedSeller.name}!`);
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
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Our Talented Sellers</h1>
        <p className="text-center text-gray-600 mb-12">Discover amazing artisans from Kampala</p>

        {/* Sellers Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {sellers.map((seller) => (
            <button
              key={seller.id}
              onClick={() => setSelectedSeller(seller)}
              className={`p-4 rounded-2xl text-left transition-all ${
                selectedSeller.id === seller.id 
                  ? 'bg-[#8B5A2B] text-white shadow-md' 
                  : 'bg-white hover:bg-gray-50 border'
              }`}
            >
              <Image 
                src={seller.avatar} 
                alt={seller.name} 
                width={80} 
                height={80} 
                className="rounded-xl mb-3 object-cover" 
              />
              <h3 className="font-semibold text-sm">{seller.name}</h3>
            </button>
          ))}
        </div>

        {/* Selected Seller Profile */}
        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-shrink-0">
              <Image 
                src={selectedSeller.avatar} 
                alt={selectedSeller.name}
                width={320}
                height={320}
                className="rounded-3xl object-cover shadow-md"
                priority
              />
            </div>

            <div className="flex-1">
              <h2 className="text-5xl font-bold mb-4">{selectedSeller.name}</h2>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-8 text-sm">
                <span>📍 {selectedSeller.location}</span>
                <span>Joined {selectedSeller.joined}</span>
                <span>⭐ {selectedSeller.rating} • {selectedSeller.productsCount} products</span>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 max-w-2xl mb-10">
                {selectedSeller.bio}
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowMessageModal(true)}
                  className="px-10 py-4 bg-[#8B5A2B] hover:bg-[#6B4420] text-white rounded-full font-medium transition-all"
                >
                  Message Seller
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
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6">Message {selectedSeller.name}</h2>
            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border rounded-xl" required />
              <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border rounded-xl" required />
              <textarea placeholder="Write your message..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} className="w-full px-4 py-3 border rounded-xl" required />
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowMessageModal(false)} className="flex-1 py-3 border rounded-full">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#8B5A2B] text-white rounded-full">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Follow Success Toast */}
      {showFollowSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-700 text-white px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3 z-50">
          ✅ You are now following <strong>{selectedSeller.name}</strong>!
        </div>
      )}
    </div>
  );
}

