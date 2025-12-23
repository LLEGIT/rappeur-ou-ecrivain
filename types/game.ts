export type AuthorType = 'rappeur' | 'ecrivain';

export interface Quote {
  author: string;
  quote: string;
  context: string;
  type: AuthorType;
}

export interface GameQuote extends Quote {
  id: number;
}

export interface GameState {
  quotes: GameQuote[];
  currentQuoteIndex: number;
  score: number;
  answers: AnswerState[];
}

export interface AnswerState {
  quoteId: number;
  correct: boolean;
  userAnswer: AuthorType;
}
