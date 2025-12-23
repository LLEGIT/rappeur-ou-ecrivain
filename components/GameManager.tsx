'use client';

import { useState, useEffect } from 'react';
import { GameQuote, AnswerState, AuthorType } from '@/types/game';
import QuoteCard from './QuoteCard';
import InputController from './InputController';
import ProgressBar from './ProgressBar';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';

interface GameManagerProps {
  initialQuotes: GameQuote[];
}

interface SavedGameState {
  currentIndex: number;
  score: number;
  answers: AnswerState[];
  quoteIds: number[];
}

const STORAGE_KEY = 'rappeur-ecrivain-game-state';

export default function GameManager({ initialQuotes }: GameManagerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string; author: string; context: string } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentQuote = initialQuotes[currentIndex];
  const isGameOver = currentIndex >= initialQuotes.length;

  // Load saved game state on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed: SavedGameState = JSON.parse(savedState);
        
        // Check if saved quotes match current quotes
        const quoteIdsMatch = parsed.quoteIds.length === initialQuotes.length &&
          parsed.quoteIds.every((id, index) => id === initialQuotes[index].id);
        
        if (quoteIdsMatch && parsed.currentIndex < initialQuotes.length) {
          setCurrentIndex(parsed.currentIndex);
          setScore(parsed.score);
          setAnswers(parsed.answers);
        }
      } catch (error) {
        console.error('Failed to load saved game state:', error);
      }
    }
    setIsLoaded(true);
  }, [initialQuotes]);

  // Clear saved state when game is completed
  useEffect(() => {
    if (isGameOver && isLoaded) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [isGameOver, isLoaded]);

  // Save game state whenever it changes (but not during transition or when showing feedback)
  useEffect(() => {
    if (!isLoaded || isTransitioning || feedback || isGameOver) return;

    const gameState: SavedGameState = {
      currentIndex,
      score,
      answers,
      quoteIds: initialQuotes.map(q => q.id),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [currentIndex, score, answers, initialQuotes, isLoaded, isTransitioning, feedback, isGameOver]);

  if (!isLoaded) {
    return null;
  }

  const handleSubmit = (answer: AuthorType) => {
    if (isTransitioning || feedback) return;
    
    const isCorrect = answer === currentQuote.type;

    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback({
        type: 'success',
        message: `Bravo ! C'était bien un ${currentQuote.type} !`,
        author: currentQuote.author,
        context: currentQuote.context,
      });
    } else {
      setFeedback({
        type: 'error',
        message: `Non, c'était un ${currentQuote.type}`,
        author: currentQuote.author,
        context: currentQuote.context,
      });
    }

    setAnswers(prev => [...prev, {
      quoteId: currentQuote.id,
      correct: isCorrect,
      userAnswer: answer,
    }]);

    // Passer à la question suivante après 3 secondes
    setIsTransitioning(true);
    setTimeout(() => {
      setFeedback(null);
      setIsTransitioning(false);
      setCurrentIndex(prev => prev + 1);
    }, 3000);
  };

  // Écran de résultat final
  if (isGameOver) {
    const correctAnswers = answers.filter(a => a.correct).length;
    
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-6 p-4">
        <div className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <Trophy className="mx-auto h-16 w-16 text-amber-500" />
          
          <h1 className="text-3xl font-bold text-zinc-100">Partie terminée !</h1>
          
          <div className="space-y-2">
            <p className="text-5xl font-bold text-emerald-500">{score} pts</p>
          </div>

          <div className="space-y-2 rounded-xl bg-zinc-900 p-4">
            <p className="text-sm text-zinc-400">Votre score</p>
            <div className="flex items-center justify-between text-lg">
              <span className="text-zinc-300">Bonnes réponses</span>
              <span className="font-bold text-emerald-500">
                {correctAnswers}/{initialQuotes.length}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY);
              window.location.reload();
            }}
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-emerald-500"
          >
            Rejouer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between space-y-6 p-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        <ProgressBar
          current={currentIndex + 1}
          total={initialQuotes.length}
          score={score}
        />

        <QuoteCard quote={currentQuote} revealed={!!feedback} />

        {/* Feedback visuel */}
        {feedback && (
          <div
            className={`space-y-3 rounded-xl border p-4 ${
              feedback.type === 'success'
                ? 'border-emerald-600 bg-emerald-950/30'
                : 'border-rose-600 bg-rose-950/30'
            }`}
          >
            <div
              className={`flex items-center gap-3 ${
                feedback.type === 'success' ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <p className="font-medium">{feedback.message}</p>
            </div>
            <div className="border-t border-zinc-800 pt-3">
              <p className="text-sm font-medium text-zinc-100">
                {feedback.author}
              </p>
              <p className="text-xs text-zinc-500">{feedback.context}</p>
            </div>
          </div>
        )}

        {/* Boutons de réponse */}
        {!feedback && !isTransitioning && (
          <InputController
            onSubmit={handleSubmit}
            disabled={isTransitioning}
          />
        )}
      </div>
    </div>
  );
}
