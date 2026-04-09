'use client';

import { useState, useEffect } from 'react';

export default function SellerActions({ sellerName }: { sellerName: string }) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showFollowSuccess, setShowFollowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isFollowing, setIsFollowing] = useState(false);

  // On mount, load follow state from localStorage
  useEffect(() => {
    const followedSellers = JSON.parse(
      localStorage.getItem('followedSellers') || '[]'
    );
    setIsFollowing(followedSellers.includes(sellerName));
  }, [sellerName]);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✅ Message sent successfully to ${sellerName}!\n\nThey will reply soon.`);
    setShowMessageModal(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleFollow = () => {
    const followedSellers = JSON.parse(
      localStorage.getItem('followedSellers') || '[]'
    );

    if (!isFollowing) {
      followedSellers.push(sellerName);
      localStorage.setItem('followedSellers', JSON.stringify(followedSellers));
      setShowFollowSuccess(true);
    } else {
      // Optional: allow unfollow
      const index = followedSellers.indexOf(sellerName);
      if (index > -1) followedSellers.splice(index, 1);
      localStorage.setItem('followedSellers', JSON.stringify(followedSellers));
    }

    setIsFollowing(!isFollowing);

    if (!isFollowing) {
      setTimeout(() => setShowFollowSuccess(false), 3000);
    }
  };

  return (
    <>
      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowMessageModal(true)}
          className="px-10 py-4 bg-[#8B5A2B] hover:bg-[#6B4420] text-white rounded-full font-medium transition-all"
        >
          Message {sellerName.split("'")[0]}
        </button>

        <button
          onClick={handleFollow}
          className={`px-10 py-4 rounded-full font-medium transition-all border-2 ${
            isFollowing
              ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
              : 'border-gray-400 hover:bg-gray-100'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow Shop'}
        </button>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6">
              Message {sellerName.split("'")[0]}
            </h2>

            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl"
              />

              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl"
              />

              <textarea
                placeholder="Your message..."
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-xl"
              />

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 border py-3 rounded-full"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#8B5A2B] text-white py-3 rounded-full"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Follow Toast */}
      {showFollowSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-700 text-white px-8 py-4 rounded-2xl shadow-2xl z-50">
          ✅ You are now following <strong>{sellerName}</strong>!
        </div>
      )}
    </>
  );
}