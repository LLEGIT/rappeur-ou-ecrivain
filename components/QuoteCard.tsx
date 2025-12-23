'use client';

import { GameQuote } from '@/types/game';
import { Sparkles } from 'lucide-react';

interface QuoteCardProps {
  quote: GameQuote;
  revealed?: boolean;
}

export default function QuoteCard({ quote, revealed = false }: QuoteCardProps) {
  return (
    <div className="relative w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl transition-all duration-300 hover:border-zinc-700">
      <div className="absolute -top-3 left-6 flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 border border-zinc-800">
        <Sparkles className="h-4 w-4 text-amber-500" />
        <span className="text-xs font-medium text-zinc-400">Citation #{quote.id}</span>
      </div>

      <blockquote className="mt-4 space-y-4">
        <p className="text-lg font-serif leading-relaxed text-zinc-100 sm:text-xl">
          "{quote.quote}"
        </p>

        {revealed && (
          <footer className="pt-4 border-t border-zinc-800">
            <cite className="text-sm font-medium text-emerald-500 not-italic">
              — {quote.author}
            </cite>
            <p className="mt-1 text-xs text-zinc-500">{quote.context}</p>
          </footer>
        )}
      </blockquote>
    </div>
  );
}
