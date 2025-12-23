# 🎮 Guide d'Utilisation - Devine la Citation

## 🚀 Démarrage Rapide

### 1. Installation

```bash
# Cloner le dépôt
git clone <your-repo-url>
cd devine-la-citation

# Installer les dépendances
npm install
```

### 2. Lancement

```bash
# Mode développement
npm run dev

# Build production
npm run build
npm start
```

L'application sera accessible sur **http://localhost:3000**

## 🎯 Comment Jouer

### Phase 1 : Deviner l'Auteur

1. **Lisez la citation** affichée dans la carte
2. **Entrez le nom de l'auteur** dans le champ de saisie
3. Cliquez sur **"Valider"** pour soumettre votre réponse

**Exemples de réponses acceptées** :
```
Citation: "Je pense, donc je suis."
✅ Accepté: "Descartes", "René Descartes", "descartes", "DESCARTES"
❌ Refusé: "desc", "Des", "carte"
```

### Phase 2 : Mode Aide (Optionnel)

Si vous ne connaissez pas l'auteur :

1. Cliquez sur **"Aide"** 
2. **Choisissez entre 2 options** (QCM)
3. Validez votre choix

⚠️ **Attention** : L'aide réduit les points de **10 → 5**

### Phase 3 : Question Bonus (Si auteur trouvé)

1. **Devinez l'œuvre** ou le contexte de la citation
2. Entrez votre réponse dans le champ
3. Validez pour **+10 points** ou cliquez sur **"Passer"**

**Exemples de contextes** :
```
Citation: "L'enfer, c'est les autres."
✅ Accepté: "Huis clos", "huis clos", "HUIS CLOS"
✅ Accepté: "huis", "clos" (mots partiels)
```

## 📊 Système de Score

| Action | Points |
|--------|--------|
| Auteur trouvé (saisie libre) | **+10** |
| Auteur trouvé (avec aide) | **+5** |
| Contexte trouvé | **+10** bonus |

**Score Maximum** : **100 points** (5 × 10 + 5 × 10)

## 🎨 Interface

### Header
- **Logo** : Icône de livre
- **Titre** : "Devine la Citation"
- **Sous-titre** : "Jeu quotidien de culture littéraire"

### Barre de Progression
- Affiche **Citation X/5**
- Affiche le **score en temps réel**
- Barre animée de progression

### Carte Citation
- **Quote** : Texte de la citation en serif
- **Badge numéroté** : Citation #X
- **Révélation** : Affiche auteur + contexte après réponse

### Zone de Saisie

#### Mode Libre
```
┌────────────────────────────────────┐
│ Qui a dit cette citation ?         │
│ [Votre réponse...]                 │
└────────────────────────────────────┘
 [Valider]  [Aide]
```

#### Mode QCM (après clic sur Aide)
```
┌─────────────────┐  ┌─────────────────┐
│  Albert Camus   │  │ Victor Hugo     │
└─────────────────┘  └─────────────────┘
           [Valider]
```

### Feedback Visuel

#### Succès ✅
```
┌────────────────────────────────────┐
│ ✓ Bravo ! C'est bien Albert Camus !│
└────────────────────────────────────┘
```

#### Erreur ❌
```
┌────────────────────────────────────┐
│ ✗ Non, c'était Albert Camus        │
└────────────────────────────────────┘
```

### Écran Final 🏆

```
        🏆
   Partie terminée !
   
       85 pts
   dont 30 pts bonus
   
   Citations trouvées:  4/5
   Contextes trouvés:   3/4
   
     [Rejouer]
```

## 🎓 Conseils & Astuces

### 1. Stratégie de Réponse

**Prénom + Nom** ou **Nom seul** sont tous deux acceptés :
- ✅ "Victor Hugo" ou "Hugo"
- ✅ "Albert Camus" ou "Camus"

**Évitez les surnoms** ou pseudonymes :
- ❌ "Voltaire" ne marchera pas pour "François-Marie Arouet"
- ✅ Utilisez le nom de plume connu (ex: "George Sand")

### 2. Utilisation de l'Aide

**Quand utiliser l'aide ?** 🤔
- ✅ Quand vous hésitez entre 2-3 auteurs
- ✅ Pour éviter une mauvaise réponse (0 point)
- ❌ Si vous connaissez déjà la réponse (perte de 5 points)

**Trade-off** :
```
Sans aide : 0 ou 10 points
Avec aide : 5 points garantis
```

### 3. Question Bonus

**Maximisez vos points** 🎯
- Les contextes acceptent les **mots-clés**
- Ex: "Misérables" suffit pour "Les Misérables"
- N'hésitez pas à tenter même partiellement !

**Formats acceptés** :
- ✅ Titre d'œuvre : "Le Mythe de Sisyphe"
- ✅ Type d'œuvre : "Essai", "Roman", "Poème"
- ✅ Mots-clés : "Sisyphe", "Mythe"

## 📱 Navigation Mobile

### Gestes Tactiles
- **Tap** : Sélection de boutons/choix
- **Scroll** : Navigation verticale
- **Pas de swipe** : Navigation linéaire par boutons

### Zones Tactiles
Toutes les zones interactives ont une taille minimale de **44×44px** pour faciliter le tap.

## ⌨️ Raccourcis Clavier (Desktop)

| Touche | Action |
|--------|--------|
| `Enter` | Valider la réponse |
| `Tab` | Naviguer entre les champs |
| `Esc` | (Futur: Fermer les modales) |

## 🐛 Résolution de Problèmes

### Ma réponse n'est pas acceptée

**Vérifiez** :
1. ✅ Orthographe correcte (accents tolérés)
2. ✅ Nom complet ou nom de famille
3. ✅ Pas de ponctuation excessive
4. ✅ Longueur > 2 caractères

**Exemples** :
```
❌ "V Hugo" → Trop court
❌ "vic" → Incomplet
✅ "Victor Hugo"
✅ "Hugo"
✅ "hugo" (casse insensible)
```

### Le jeu ne charge pas

1. **Vérifiez** que vous êtes sur `http://localhost:3000`
2. **Rechargez** la page (Cmd+R / Ctrl+R)
3. **Vérifiez** la console pour les erreurs
4. **Redémarrez** le serveur de dev

```bash
# Arrêter le serveur (Ctrl+C)
# Relancer
npm run dev
```

### Les citations ne changent pas

Le jeu génère **5 citations aléatoires** au chargement.

Pour une nouvelle partie :
- **Cliquez** sur "Rejouer" à la fin
- **Ou** rechargez la page (Cmd+R / Ctrl+R)

## 🔧 Configuration Avancée

### Modifier le Nombre de Citations

Éditez `/lib/constants.ts` :
```typescript
export const GAME_CONFIG = {
  TOTAL_QUOTES: 5,  // Changez cette valeur (3-10 recommandé)
  // ...
}
```

### Ajuster les Scores

Éditez `/lib/constants.ts` :
```typescript
export const SCORES = {
  AUTHOR_FREE: 10,   // Points saisie libre
  AUTHOR_HELP: 5,    // Points avec aide
  BONUS_CONTEXT: 10, // Points bonus
}
```

### Modifier les Délais de Feedback

Éditez `/lib/constants.ts` :
```typescript
export const GAME_CONFIG = {
  SUCCESS_FEEDBACK_DELAY: 1500,  // ms
  ERROR_FEEDBACK_DELAY: 2500,    // ms
}
```

## 📚 Ajouter des Citations

Éditez `/data/quotes.json` :

```json
{
  "author": "Nom de l'Auteur",
  "quote": "Texte de la citation.",
  "context": "Titre de l'œuvre ou contexte"
}
```

**Conseils** :
- ✅ Utilisez des guillemets français « »
- ✅ Citation complète et grammaticale
- ✅ Contexte précis (titre d'œuvre)
- ✅ Auteur : nom de plume ou nom réel connu

## 🎨 Personnalisation du Thème

### Modifier les Couleurs

Éditez `/app/globals.css` :

```css
:root {
  --background: #09090b;  /* Fond principal */
  --foreground: #fafafa;  /* Texte */
}
```

### Classes Tailwind Personnalisées

Les couleurs principales :
- `zinc-950` : Fond
- `emerald-500` : Succès
- `rose-500` : Erreur
- `amber-500` : Aide/Bonus

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres Plateformes

Le projet est compatible avec :
- **Netlify**
- **Railway**
- **Render**
- Tout hébergeur supportant **Next.js 16**

## 📞 Support

Pour toute question ou problème :
1. Consultez la [documentation technique](ARCHITECTURE.md)
2. Vérifiez la [checklist](CHECKLIST.md)
3. Ouvrez une issue sur GitHub

---

**Bon jeu ! 🎮📚**
