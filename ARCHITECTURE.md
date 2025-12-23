# 📋 Documentation Technique - Devine la Citation

## 🏗️ Architecture Globale

L'application suit une architecture **Next.js 16 App Router** avec une séparation claire entre :
- **Server Components** : Génération des données côté serveur
- **Client Components** : Interactivité côté client
- **Server Actions** : Logique métier sécurisée

## 📊 Types TypeScript

### Quote (Base)
```typescript
interface Quote {
  author: string;      // Nom de l'auteur
  quote: string;       // Texte de la citation
  context: string;     // Œuvre ou contexte d'origine
}
```

### GameQuote (Extended)
```typescript
interface GameQuote extends Quote {
  id: number;          // Identifiant unique (1-5)
  wrongAuthor: string; // Auteur incorrect pour le QCM
}
```

### GameState
```typescript
interface GameState {
  quotes: GameQuote[];           // Les 5 citations de la partie
  currentQuoteIndex: number;     // Index actuel (0-4)
  score: number;                 // Score total
  bonusScore: number;            // Points bonus accumulés
  answers: AnswerState[];        // Historique des réponses
}
```

### AnswerState
```typescript
interface AnswerState {
  quoteId: number;               // ID de la citation
  authorGuessed: boolean;        // Auteur trouvé ?
  contextGuessed: boolean;       // Contexte trouvé ?
  usedHelp: boolean;             // Aide utilisée ?
  userAnswer: string;            // Réponse de l'utilisateur
}
```

### GamePhase
```typescript
type GamePhase = 
  | 'author-input'      // Saisie libre de l'auteur
  | 'author-mcq'        // QCM avec 2 choix
  | 'bonus-context'     // Question bonus contexte
  | 'result';           // Écran de résultat final
```

## 🎮 Flow du Jeu

```
START
  ↓
[author-input] ─── Besoin d'aide ? ───→ [author-mcq]
  ↓                                           ↓
  Réponse correcte ?                    Réponse correcte ?
  ↓ OUI                                   ↓ OUI
[bonus-context]                         [bonus-context]
  ↓                                           ↓
  Réponse ou Skip                         Réponse ou Skip
  ↓                                           ↓
  Citation suivante ou [result]           Citation suivante ou [result]
  ↓ NON (depuis author-input/mcq)
  Citation suivante ou [result]
```

## 🔧 Composants Détaillés

### GameManager.tsx (Client Component)

**Responsabilités** :
- Orchestrer le flow global du jeu
- Gérer l'état avec `useState` et `useActionState`
- Calculer les scores
- Naviguer entre les phases

**Hooks utilisés** :
- `useState` : État local (phase, index, scores, feedback)
- `useActionState` : Intégration des Server Actions
- `useOptimistic` : (Prévu) Mises à jour optimistes

**Props** :
```typescript
interface GameManagerProps {
  initialQuotes: GameQuote[];  // Citations générées côté serveur
}
```

**État interne** :
```typescript
const [currentIndex, setCurrentIndex] = useState(0);
const [phase, setPhase] = useState<GamePhase>('author-input');
const [score, setScore] = useState(0);
const [bonusScore, setBonusScore] = useState(0);
const [answers, setAnswers] = useState<AnswerState[]>([]);
const [feedback, setFeedback] = useState<FeedbackType | null>(null);
const [usedHelp, setUsedHelp] = useState(false);
```

### QuoteCard.tsx (Client Component)

**Responsabilités** :
- Afficher la citation avec style gaming
- Révéler l'auteur et le contexte conditionnellement

**Props** :
```typescript
interface QuoteCardProps {
  quote: GameQuote;
  revealed?: boolean;  // Afficher la solution ?
}
```

**Styles clés** :
- Fond : `bg-zinc-950`
- Bordure : `border-zinc-800`
- Badge : `bg-zinc-900` avec icône `Sparkles`
- Typographie : `font-serif` pour la citation

### InputController.tsx (Client Component)

**Responsabilités** :
- Gérer la saisie utilisateur (libre ou QCM)
- Basculer entre les modes
- Valider et soumettre les réponses

**Props** :
```typescript
interface InputControllerProps {
  onSubmit: (answer: string) => void;
  onRequestHelp: () => void;
  disabled?: boolean;
  showHelp?: boolean;
  choices?: string[];  // Si défini → mode QCM
}
```

**Logique** :
- Si `choices` est défini : affiche 2 boutons (QCM)
- Sinon : affiche un input texte + bouton "Aide"

### BonusContext.tsx (Client Component)

**Responsabilités** :
- Afficher la phase bonus
- Gérer la saisie du contexte
- Permettre de passer la question

**Props** :
```typescript
interface BonusContextProps {
  correctContext: string;
  onSubmit: (answer: string) => void;
  onSkip: () => void;
}
```

**Styles** :
- Bordure : `border-amber-600/30`
- Fond : `bg-amber-950/20`
- Icône : `Award` (Lucide)

### ProgressBar.tsx (Client Component)

**Responsabilités** :
- Afficher la progression (x/5)
- Afficher le score en temps réel
- Animer la barre de progression

**Props** :
```typescript
interface ProgressBarProps {
  current: number;   // Citation actuelle (1-5)
  total: number;     // Total (5)
  score: number;     // Score actuel
}
```

**Animation** :
- Barre avec `transition-all duration-500 ease-out`
- Largeur dynamique via `style={{ width: '${percentage}%' }}`

## 🔐 Server Actions

### checkAnswer (app/actions/game.ts)

```typescript
'use server';

interface CheckAnswerParams {
  answer: string;
  quoteId: number;
  type: 'author' | 'context';
  correctAnswer: string;
}

export async function checkAnswer(params: CheckAnswerParams) {
  // Normalisation
  const normalized = answer.toLowerCase().trim();
  const normalizedCorrect = correctAnswer.toLowerCase().trim();

  // Vérification flexible
  const isCorrect =
    normalized === normalizedCorrect ||
    normalized.includes(normalizedCorrect) ||
    normalizedCorrect.includes(normalized);

  return { isCorrect, correctAnswer, quoteId, type };
}
```

**Stratégie de validation** :
1. Égalité exacte (après normalisation)
2. Inclusion partielle (ex: "Camus" dans "Albert Camus")
3. Inclusion inverse (ex: "Albert Camus" dans "Camus")

## 🌐 API Routes

### GET /api/quotes

**Fichier** : `app/api/quotes/route.ts`

**Logique** :
```typescript
1. Charger toutes les citations depuis quotes.json
2. Mélanger aléatoirement (Fisher-Yates)
3. Sélectionner les 5 premières
4. Pour chaque citation :
   - Filtrer les autres auteurs
   - Choisir un wrongAuthor aléatoire
   - Créer un GameQuote
5. Retourner { quotes: GameQuote[] }
```

**Exemple de réponse** :
```json
{
  "quotes": [
    {
      "id": 1,
      "author": "Albert Camus",
      "quote": "Au milieu de l'hiver...",
      "context": "Retour à Tipasa",
      "wrongAuthor": "Jean-Paul Sartre"
    },
    // ... 4 autres citations
  ]
}
```

## 🎨 Système de Design

### Couleurs

```typescript
const colors = {
  background: 'zinc-950',     // #09090b
  foreground: 'zinc-100',     // #fafafa
  border: 'zinc-800',         // #27272a
  
  success: 'emerald-500',     // #10b981
  error: 'rose-500',          // #f43f5e
  help: 'amber-500',          // #f59e0b
  bonus: 'amber-600',         // #d97706
}
```

### Typographie

```css
--font-sans: Geist Sans
--font-mono: Geist Mono
--font-serif: system-ui serif (pour citations)
```

### Espacements

- Padding conteneur : `p-4` (16px)
- Gap éléments : `gap-3` ou `gap-6`
- Border radius : `rounded-xl` (12px) ou `rounded-2xl` (16px)

### Animations

```css
/* Transitions */
transition-all duration-200  // Boutons, états
transition-all duration-300  // Cartes
transition-all duration-500  // Barre de progression

/* Easing */
ease-out                     // Par défaut
```

## 📱 Responsive Breakpoints

```typescript
// Tailwind default breakpoints
sm: '640px'   // Petits mobiles en paysage
md: '768px'   // Tablettes
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
```

**Stratégie mobile-first** :
- Base : Mobile portrait (320px+)
- `sm:` : Ajustements pour mobiles paysage
- `md:` : Layout tablettes
- `lg:` : Layout desktop

## 🔄 Gestion d'État

### Local State (useState)
- Phase du jeu
- Index de la citation courante
- Scores
- Feedback utilisateur
- Flag "usedHelp"

### Server State (useActionState)
- Validation des réponses
- Communication avec Server Actions
- État de pending

### Optimistic Updates (useOptimistic) - Prévu
- Affichage instantané des réponses
- Rollback en cas d'erreur serveur

## 🎯 Scoring System

```typescript
const SCORES = {
  AUTHOR_FREE: 10,      // Saisie libre
  AUTHOR_HELP: 5,       // Avec aide (QCM)
  BONUS_CONTEXT: 10,    // Contexte trouvé
};

// Calcul du score
let totalScore = 0;
answers.forEach(answer => {
  if (answer.authorGuessed) {
    totalScore += answer.usedHelp ? SCORES.AUTHOR_HELP : SCORES.AUTHOR_FREE;
  }
  if (answer.contextGuessed) {
    totalScore += SCORES.BONUS_CONTEXT;
  }
});
```

**Score maximum possible** : 100 points
- 5 auteurs × 10 pts = 50 pts
- 5 contextes × 10 pts = 50 pts

## 🚀 Performance

### Optimisations
- **Server Components** : Page principale (pas de JS client)
- **Code splitting** : Composants chargés à la demande
- **Minimal JS** : Seulement pour l'interactivité
- **Tailwind purge** : CSS optimisé en production

### Métriques cibles
- **FCP** (First Contentful Paint) : < 1.5s
- **LCP** (Largest Contentful Paint) : < 2.5s
- **TTI** (Time to Interactive) : < 3.5s
- **CLS** (Cumulative Layout Shift) : < 0.1

## 🧪 Tests (À implémenter)

### Tests unitaires
- Fonction `getRandomQuotes()`
- Server Action `checkAnswer()`
- Calcul des scores

### Tests d'intégration
- Flow complet du jeu
- Navigation entre phases
- Gestion des erreurs

### Tests E2E
- Parcours utilisateur complet
- Responsive sur différents devices
- Accessibilité (a11y)

## 🔮 Évolutions Futures

1. **Persistance** : LocalStorage pour sauvegarder la partie
2. **Quotidien** : 1 seule partie par jour (seed basé sur la date)
3. **Leaderboard** : Classement des meilleurs scores
4. **Partage** : Partager son score sur les réseaux sociaux
5. **Thèmes** : Mode clair, mode high contrast
6. **Statistiques** : Historique des performances
7. **Indices** : Système d'indices progressifs
8. **Animations** : Confettis, transitions de page
9. **PWA** : Support offline, installation
10. **Multi-langue** : Support anglais, espagnol...

---

**Version** : 1.0.0  
**Dernière mise à jour** : 23 décembre 2025
