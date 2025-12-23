'use server';

import { compareStrings } from '@/lib/utils';

interface CheckAnswerParams {
  answer: string;
  quoteId: number;
  type: 'author' | 'context';
  correctAnswer: string;
}

export async function checkAnswer({ answer, quoteId, type, correctAnswer }: CheckAnswerParams) {
  // Utilisation de la fonction de comparaison avancée
  const isCorrect = compareStrings(answer, correctAnswer);

  return {
    isCorrect,
    correctAnswer,
    quoteId,
    type,
  };
}
