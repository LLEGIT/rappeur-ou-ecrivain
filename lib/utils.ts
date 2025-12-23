/**
 * Utilitaires pour la normalisation et validation des réponses
 */

/**
 * Normalise une chaîne pour la comparaison
 * - Supprime les accents
 * - Convertit en minuscules
 * - Supprime les espaces superflus
 * - Supprime la ponctuation
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Supprime la ponctuation
    .trim()
    .replace(/\s+/g, ' '); // Normalise les espaces
}

/**
 * Compare deux chaînes de manière flexible
 * Retourne true si :
 * - Égalité exacte après normalisation
 * - L'une contient l'autre (inclusion partielle)
 * - Similarité élevée (distance de Levenshtein)
 */
export function compareStrings(answer: string, correct: string): boolean {
  const normalizedAnswer = normalizeString(answer);
  const normalizedCorrect = normalizeString(correct);

  // Cas 1: Égalité exacte
  if (normalizedAnswer === normalizedCorrect) {
    return true;
  }

  // Cas 2: Inclusion (pour les noms composés)
  if (
    normalizedAnswer.includes(normalizedCorrect) ||
    normalizedCorrect.includes(normalizedAnswer)
  ) {
    return true;
  }

  // Cas 3: Mots individuels (pour "Victor Hugo" vs "Hugo")
  const answerWords = normalizedAnswer.split(' ');
  const correctWords = normalizedCorrect.split(' ');

  // Si au moins 50% des mots correspondent
  const matchingWords = answerWords.filter(word => 
    correctWords.some(cWord => 
      word === cWord || word.includes(cWord) || cWord.includes(word)
    )
  );

  if (matchingWords.length >= Math.min(answerWords.length, correctWords.length) * 0.5) {
    return true;
  }

  return false;
}

/**
 * Extrait le nom de famille d'un nom complet
 * Ex: "Victor Hugo" → "Hugo"
 */
export function extractLastName(fullName: string): string {
  const parts = fullName.trim().split(' ');
  return parts[parts.length - 1];
}

/**
 * Génère un score de similarité entre deux chaînes (0-1)
 * Utilise la distance de Levenshtein
 */
export function getSimilarity(str1: string, str2: string): number {
  const s1 = normalizeString(str1);
  const s2 = normalizeString(str2);

  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  if (longer.length === 0) {
    return 1.0;
  }

  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

/**
 * Calcule la distance de Levenshtein entre deux chaînes
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}
