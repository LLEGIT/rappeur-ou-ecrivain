import { NextResponse } from 'next/server';
import quotesData from '@/data/quotes.json';
import { Quote, GameQuote } from '@/types/game';

export async function GET() {
  try {
    const allQuotes = quotesData as Quote[];

    // Sélection de 5 citations aléatoires
    const shuffled = [...allQuotes].sort(() => Math.random() - 0.5);
    const selectedQuotes = shuffled.slice(0, 5);

    // Pour chaque citation, sélectionner un auteur incorrect
    const gameQuotes: GameQuote[] = selectedQuotes.map((quote, index) => {
      // Filtrer les auteurs différents de l'auteur correct
      const otherAuthors = allQuotes
        .map(q => q.author)
        .filter(author => author !== quote.author);

      // Sélectionner un auteur aléatoire parmi les autres
      const wrongAuthor = otherAuthors[Math.floor(Math.random() * otherAuthors.length)];

      return {
        ...quote,
        id: index + 1,
        wrongAuthor,
      };
    });

    return NextResponse.json({ quotes: gameQuotes });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to load quotes' },
      { status: 500 }
    );
  }
}
