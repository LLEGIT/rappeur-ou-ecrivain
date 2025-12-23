/**
 * Constantes globales du jeu
 */

// Scoring
export const SCORES = {
  AUTHOR_FREE: 10,       // Points pour auteur trouvé en saisie libre
  AUTHOR_HELP: 5,        // Points pour auteur trouvé avec aide (QCM)
  BONUS_CONTEXT: 10,     // Points bonus pour contexte trouvé
} as const;

// Configuration du jeu
export const GAME_CONFIG = {
  TOTAL_QUOTES: 5,              // Nombre de citations par partie
  MIN_QUOTES_DATABASE: 20,      // Minimum de citations dans la base
  SUCCESS_FEEDBACK_DELAY: 1500, // Délai feedback succès (ms)
  ERROR_FEEDBACK_DELAY: 2500,   // Délai feedback erreur (ms)
} as const;

// Messages
export const MESSAGES = {
  CORRECT_AUTHOR: (author: string) => `Bravo ! C'est bien ${author} !`,
  WRONG_AUTHOR: (author: string) => `Non, c'était ${author}`,
  CORRECT_CONTEXT: () => `Excellent ! +10 points bonus !`,
  WRONG_CONTEXT: (context: string) => `C'était : ${context}`,
  LOADING: 'Chargement des citations...',
  ERROR: 'Une erreur est survenue',
} as const;

// Seuils de validation
export const VALIDATION = {
  MIN_ANSWER_LENGTH: 2,          // Longueur minimale d'une réponse
  SIMILARITY_THRESHOLD: 0.7,     // Seuil de similarité Levenshtein (0-1)
} as const;

// API
export const API = {
  QUOTES_ENDPOINT: '/api/quotes',
} as const;
