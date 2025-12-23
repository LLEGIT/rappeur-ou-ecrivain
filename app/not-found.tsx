import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <FileQuestion className="mx-auto h-24 w-24 text-zinc-700" />
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-zinc-100">404</h1>
          <h2 className="text-2xl font-semibold text-zinc-300">Page non trouvée</h2>
          <p className="text-sm text-zinc-500">
            Cette page n'existe pas ou a été déplacée.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-emerald-500"
        >
          Retour au jeu
        </Link>
      </div>
    </div>
  );
}
