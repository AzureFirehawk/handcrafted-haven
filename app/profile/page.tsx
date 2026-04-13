import { auth } from '@/auth';
import { fetchUserByEmail, fetchProductsBySellerEmail } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import Image from 'next/image'; 

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const user = await fetchUserByEmail(session.user.email!);
  const products = await fetchProductsBySellerEmail(user.email);

  return (
    <main className="min-h-screen bg-[#f8f3ee] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Profile Header */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 bg-[#7a5c46] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-800">{user.name}</h1>
              <p className="text-stone-500 font-medium">{user.email}</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">Account Type</p>
            <span className="bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-sm font-bold border border-amber-200">
              {products.length > 0 ? 'Verified Artisan' : 'Community Member'}
            </span>
          </div>
        </section>

        {/* Inventory section / Products */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-stone-800">My Shop Inventory</h2>
              <p className="text-stone-500 text-sm">Manage and view the handcrafted items you are currently selling.</p>
            </div>
            <span className="text-sm font-bold text-[#7a5c46] bg-white px-3 py-1 rounded-lg border border-stone-200">
              {products.length} Products
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                    {/* 2. Cambiamos <img> por <Image /> de Next.js */}
                    <Image 
                      src={product.image || '/placeholder.jpg'} 
                      alt={product.name}
                      fill // Esto hace que la imagen llene el contenedor relativo
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm z-10">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-stone-800 mb-1">{product.name}</h3>
                    <p className="text-stone-500 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                      <span className="text-xl font-bold text-[#7a5c46]">${product.price}</span>
                      <button className="text-xs font-bold text-stone-400 hover:text-amber-700 transition">Edit Product</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-stone-200">
              <div className="max-w-sm mx-auto space-y-4">
                <div className="text-5xl">🌿</div>
                <h3 className="text-xl font-bold text-stone-800">No products found</h3>
                <p className="text-stone-500">It looks like you haven't listed any handcrafted items yet. Start selling to see your inventory here!</p>
                <button className="mt-4 bg-[#7a5c46] text-white px-6 py-2 rounded-full font-bold hover:bg-[#634a38] transition">
                  Create First Listing
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}