'use client';

import { Mic, BookOpen } from 'lucide-react';
import { AuthorType } from '@/types/game';

interface InputControllerProps {
  onSubmit: (answer: AuthorType) => void;
  disabled?: boolean;
}

export default function InputController({
  onSubmit,
  disabled = false,
}: InputControllerProps) {
  return (
    <div className="w-full space-y-3">
      <p className="text-sm text-zinc-400 text-center font-medium">Cette citation vient d'un :</p>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSubmit('rappeur')}
          disabled={disabled}
          className="group relative overflow-hidden rounded-xl border-2 border-zinc-800 bg-zinc-900 p-6 text-center font-bold transition-all duration-200 hover:scale-105 hover:border-emerald-500 hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <div className="flex flex-col items-center gap-3">
            <Mic className="h-8 w-8 text-zinc-400 transition-colors group-hover:text-emerald-500" />
            <span className="text-lg text-zinc-100 group-hover:text-emerald-500">Rappeur</span>
          </div>
        </button>

        <button
          onClick={() => onSubmit('ecrivain')}
          disabled={disabled}
          className="group relative overflow-hidden rounded-xl border-2 border-zinc-800 bg-zinc-900 p-6 text-center font-bold transition-all duration-200 hover:scale-105 hover:border-amber-500 hover:bg-amber-500/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <div className="flex flex-col items-center gap-3">
            <BookOpen className="h-8 w-8 text-zinc-400 transition-colors group-hover:text-amber-500" />
            <span className="text-lg text-zinc-100 group-hover:text-amber-500">Écrivain</span>
          </div>
        </button>
      </div>
    </div>
  );
}
