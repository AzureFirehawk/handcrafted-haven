import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import Link from 'next/link';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { signup? : string };
  }) {
  const signup = searchParams.signup;

  return (
    <main className="flex items-center justify-center md:h-screen bg-[#f8f3ee]">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* Header del Login con estilo Handcrafted */}
        <div className="flex h-20 w-full items-end rounded-t-2xl bg-[#7a5c46] p-3 md:h-36">
          <div className="w-full text-white text-center pb-4">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Handcrafted <span className="font-light italic text-[#eadfd3]">Haven</span>
            </Link>
          </div>
        </div>
        {signup === "success" && (
          <p className="text-green-600 text-sm text-center">
            Account created successfully! Please log in.
          </p>
        )}
        {/* Formulario envuelto en Suspense */}
        <Suspense fallback={<p className="text-center text-[#3e2f25]">Cargando...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}