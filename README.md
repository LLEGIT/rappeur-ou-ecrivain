# 🎯 Rappeur ou Écrivain

Un jeu quotidien mobile-first qui vous met au défi de deviner si une citation provient d'un rappeur ou d'un écrivain.

## 🚀 Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript
- **Style**: Tailwind CSS 4
- **Icônes**: Lucide React
- **React**: Version 19

## 🎮 Concept du Jeu

### Règles
1. **5 citations** sont affichées aléatoirement
2. Pour chaque citation, vous devez deviner : **Rappeur** ou **Écrivain** ?
3. Après votre réponse, découvrez l'auteur et le contexte
4. **10 points** par bonne réponse

### Système de Score
- ✅ Bonne réponse: **10 points**
- ❌ Mauvaise réponse: **0 point**
- **Score maximum**: 50 points (5/5)

## 🎨 Design UI

### Thème
- **Couleur principale**: Zinc-950 (fond sombre)
- **Accents**:
  - ✅ Succès: Emerald-500
  - ❌ Erreur: Rose-500
  - 🆘 Aide: Amber-500

### Composants
- Cartes avec bordures `border-zinc-800`
- Animations fluides et transitions CSS
- Feedback visuel fort (icônes Lucide React)
- Design mobile-first responsive

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
npm start
```

Le jeu sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📚 Fichier quotes.json

Format des citations :

```json
{
  "author": "Albert Camus",
  "quote": "Au milieu de l'hiver, j'ai découvert en moi un invincible été.",
  "context": "Retour à Tipasa"
}
```

Le fichier contient plus de 100 citations d'auteurs francophones classiques et contemporains.

## 🧩 Composants Principaux

### GameManager
Gère l'état global du jeu :
- Navigation entre les 5 citations
- Calcul des scores
- Gestion des phases (input, QCM, bonus, résultat)
- Utilisation de `useActionState` pour les Server Actions

### QuoteCard
Affiche la citation avec typographie gaming :
- Style carte moderne avec bordures Zinc-800
- Affichage conditionnel de l'auteur et du contexte
- Badge numéroté pour chaque citation

### InputController
Gestion des entrées utilisateur :
- Mode saisie libre par défaut
- Basculement vers QCM avec 2 choix
- Validation avec feedback visuel
- Bouton d'aide intégré

### BonusContext
Phase bonus après avoir trouvé l'auteur :
- Input dédié pour le contexte
- Système de points bonus (+10)
- Option de passer la question

### ProgressBar
Indicateur de progression style Wordle :
- Affichage x/5 citations
- Barre de progression animée
- Score en temps réel

## 🔧 Server Actions

### checkAnswer
```typescript
checkAnswer({
  answer: string,
  quoteId: number,
  type: 'author' | 'context',
  correctAnswer: string
})
```

Valide les réponses côté serveur avec normalisation flexible des chaînes.

## 🌐 API Route

### GET /api/quotes
Retourne 5 citations aléatoires avec un auteur incorrect pour le QCM :

```typescript
{
  quotes: GameQuote[]
}
```

Chaque `GameQuote` contient :
- `id`: Numéro de la citation (1-5)
- `author`: Auteur correct
- `quote`: Texte de la citation
- `context`: Œuvre/contexte d'origine
- `wrongAuthor`: Auteur incorrect pour le QCM

## 🎯 Fonctionnalités React 19

- **useActionState**: Gestion des Server Actions avec état
- **useOptimistic**: Mises à jour optimistes de l'UI (prévu)
- **Server Components**: Génération côté serveur des citations
- **Server Actions**: Validation sécurisée des réponses

## 📱 Responsive Design

Le jeu est optimisé pour mobile-first :
- Breakpoints Tailwind (sm, md, lg)
- Layout flexible
- Touch-friendly (boutons et zones de clic adaptées)

## 🚀 Déploiement

Le projet est prêt pour déploiement sur Vercel :

```bash
vercel
```

Ou toute plateforme supportant Next.js 16.

## 📄 Licence

MIT

## 👤 Auteur

Créé avec ❤️ en France
