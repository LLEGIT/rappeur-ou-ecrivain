import GameManager from '@/components/GameManager';
import quotesData from '@/data/quotes.json';
import { Quote, GameQuote } from '@/types/game';
import { BookOpen } from 'lucide-react';

// Fonction utilitaire pour sélectionner 5 citations aléatoires
function getRandomQuotes(): GameQuote[] {
  const allQuotes = quotesData as Quote[];
  const shuffled = [...allQuotes].sort(() => Math.random() - 0.5);
  const selectedQuotes = shuffled.slice(0, 5);

  return selectedQuotes.map((quote, index) => ({
    ...quote,
    id: index + 1,
  }));
}

export default function Home() {
  const quotes = getRandomQuotes();

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-600 p-2">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-100">Rappeur ou Écrivain</h1>
              <p className="text-xs text-zinc-500">Devinez l'origine de la citation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Game */}
      <GameManager initialQuotes={quotes} />

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
        <p>Nouvelle partie chaque jour · Made with ❤️ in France</p>
      </footer>
    </main>
  );
}
