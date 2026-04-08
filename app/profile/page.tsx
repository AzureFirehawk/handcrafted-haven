import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = await fetchUserByEmail(session.user.email!);

  return (
    <main className="min-h-screen bg-[#f8f3ee] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Profile Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="bg-[#7a5c46] p-8 text-white flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-stone-100 rounded-full flex items-center justify-center text-[#7a5c46] text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-stone-300 text-sm">Official Handcrafted Member</p>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">
                Active Session
              </span>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-8">
            {/* Column 1: Basic data */}
            <div className="space-y-4">
              <h2 className="text-stone-400 text-xs font-bold uppercase tracking-widest">General Information</h2>
              <div>
                <p className="text-stone-500 text-sm">Full Name</p>
                <p className="text-stone-800 font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-stone-500 text-sm">Email Address</p>
                <p className="text-stone-800 font-medium">{user.email}</p>
              </div>
            </div>

            {/* Column 2: System data */}
            <div className="space-y-4">
              <h2 className="text-stone-400 text-xs font-bold uppercase tracking-widest">System Metadata</h2>
              <div>
                <p className="text-stone-500 text-sm">User Unique ID (UUID)</p>
                <p className="text-stone-600 text-xs font-mono bg-stone-50 p-2 rounded border border-stone-100">
                  {user.id}
                </p>
              </div>
              <div>
                <p className="text-stone-500 text-sm">Account Created</p>
                <p className="text-stone-800 font-medium">
                  {new Date(user.created_at).toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
          <h3 className="text-[#7a5c46] font-bold mb-4">Your Shopping Activity</h3>
          <p className="text-stone-600 text-sm italic">
            Currently, you haven't made any purchases. Explore our <strong>Shop</strong> to find unique handcrafted pieces!
          </p>
        </div>
      </div>
    </main>
  );
}