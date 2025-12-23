'use client';

import { useState } from 'react';
import { Award, Send } from 'lucide-react';

interface BonusContextProps {
  correctContext: string;
  onSubmit: (answer: string) => void;
  onSkip: () => void;
}

export default function BonusContext({ correctContext, onSubmit, onSkip }: BonusContextProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  return (
    <div className="w-full space-y-4 rounded-2xl border border-amber-600/30 bg-amber-950/20 p-6">
      <div className="flex items-center gap-2 text-amber-500">
        <Award className="h-5 w-5" />
        <h3 className="font-semibold">Question Bonus</h3>
      </div>

      <p className="text-sm text-zinc-300">
        Vous avez trouvé l'auteur ! Pouvez-vous deviner l'œuvre ou le contexte d'origine de cette citation ?
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Ex: Les Misérables, Un discours..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 transition-all duration-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!answer.trim()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Valider
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-zinc-400 transition-all duration-200 hover:bg-zinc-800"
          >
            Passer
          </button>
        </div>
      </form>

      <p className="text-xs text-zinc-500">+10 points bonus si vous trouvez !</p>
    </div>
  );
}
