import SignupForm from "@/app/ui/signup-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-[#f8f3ee]">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">

        {/* HEADER (same style as login) */}
        <div className="flex h-20 w-full items-end rounded-t-2xl bg-[#7a5c46] p-3 md:h-36">
          <div className="w-full text-white text-center pb-4">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Handcrafted <span className="font-light italic text-[#eadfd3]">Haven</span>
            </Link>
          </div>
        </div>

        {/* FORM BOX */}
        <div className="flex-1 rounded-b-2xl bg-white px-6 pb-6 pt-8 shadow-md">
          <SignupForm />
        </div>

      </div>
    </main>
  );
}