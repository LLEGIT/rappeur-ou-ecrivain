'use client';

import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-rose-600 bg-rose-950/20 p-8 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-rose-500" />
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-100">Oups, une erreur est survenue</h1>
          <p className="text-sm text-zinc-400">
            Nous n'avons pas pu charger le jeu. Veuillez réessayer.
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-emerald-500"
        >
          Réessayer
        </button>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-xs text-zinc-500 hover:text-zinc-400">
              Détails techniques
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-zinc-900 p-2 text-xs text-rose-400">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
