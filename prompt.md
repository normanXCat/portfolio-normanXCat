# 🚀 Prompt Portfolio — Norman Vonizara

> Stack : **Next.js · TypeScript · Tailwind CSS · shadcn/ui · @tabler/icons-react**  
> Design : inspiré de [melvynx.com](https://melvynx.com/) — minimalisme sombre raffiné

---

## PHILOSOPHIE DESIGN (frontend-skill)

Avant de coder, engage-toi sur une direction esthétique claire et audacieuse.

**Direction choisie** : Minimalisme sombre raffiné — inspiré de melvynx.com
- Pas un minimalisme générique : chaque détail doit être intentionnel
- Ce qui rend ce portfolio INOUBLIABLE : la typographie grande et affirmée, le rythme aéré entre les sections, et la cohérence parfaite noir/blanc/gris

**Ce qu'il NE FAUT PAS faire** :
- ❌ Pas de palette violette sur fond blanc (cliché IA)
- ❌ Pas d'Inter ou Roboto comme police principale
- ❌ Pas de cards avec shadow agressive
- ❌ Pas de layout générique "hero image + grille de cards"

---

## STACK TECHNIQUE

```
Next.js 14+         (App Router)
TypeScript          strict — pas de `any`
Tailwind CSS        v3
shadcn/ui           Badge, Separator, Button
@tabler/icons-react ^3.41.1  ← remplace lucide-react
framer-motion       animations d'entrée
next/font           polices Google
```

---

## TYPOGRAPHIE (critique — inspirée melvynx.com)

Importe via `next/font/google` :

| Rôle | Police |
|------|--------|
| Display / Titres | `DM Serif Display` ou `Playfair Display` |
| Corps / UI | `DM Sans` |

```css
/* Tailles */
h1 hero      : text-5xl md:text-6xl font-bold tracking-tight
section title: text-2xl font-bold

/* Couleurs */
texte principal  : white / zinc-100
texte secondaire : zinc-400
```

---

## PALETTE

```css
--background : #0a0a0a;
--foreground  : #fafafa;
--muted       : #71717a;                   /* zinc-500 */
--border      : rgba(255, 255, 255, 0.08);
--accent      : #e4e4e7;                   /* zinc-200 */
```

---

## ANIMATIONS (framer-motion)

```tsx
// Chaque section entre avec :
initial    = {{ opacity: 0, y: 16 }}
animate    = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.5, delay: index * 0.1 }}

// Stagger les éléments de liste — subtil, pas spectaculaire
```

---

## STRUCTURE FICHIERS

```
app/
  layout.tsx          ← fonts + metadata globale
  page.tsx            ← importe toutes les sections
components/
  hero.tsx
  about.tsx
  projects.tsx
  experience.tsx
  skills.tsx
  contact.tsx
  tech-badge.tsx      ← Badge shadcn réutilisable
```

---

## ICÔNES — @tabler/icons-react

```tsx
// Installation
npm install @tabler/icons-react

// Usage
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconPhone,
  IconMapPin,
  IconExternalLink,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconCode,
} from "@tabler/icons-react";

// Taille recommandée dans les liens hero
<IconBrandGithub size={18} stroke={1.5} />
```

---

## CONTENU COMPLET

---

### SECTION HERO

```
Nom    : Norman Vonizara
Titre  : "Développeur Full-Stack · Frontend Focused"
Bio    : "Passionné par les interfaces utilisateurs, l'électronique
          embarquée et les réseaux. Actuellement en stage chez Mada Digital."

Liens (avec @tabler/icons-react) :
  IconBrandGithub   → https://github.com/normanXCat
  IconBrandLinkedin → https://linkedin.com/in/norman-vonizara-07b96b36a/
  IconMail          → normanvonizara@gmail.com
  IconPhone         → +261 34 30 638 17

Ligne discrète (zinc-500) :
  "Antsiranana, Madagascar · Disponible pour un stage"
```

> Pas de photo. Juste le texte, grand, propre, comme melvynx.com.

---

### SECTION "Ce que j'ai fait" — liste narrative

- Actuellement en stage chez **Mada Digital** (Antananarivo) — développement de SalonAtlas et Skolara
- Développé et déployé **SalonAtlas** — annuaire de salons de coiffure à Madagascar
- Développé **Skolara** — plateforme éducative scolaire et préscolaire (Next.js, blog, pré-inscription)
- **2ème place au Hackathon Redshalk 2025** — prototype plateforme tourisme, rôle front-end principal
- Stage **Nisasarana SARLU** (Antananarivo) — développement front-end, certifié en interne
- Atelier **Arduino INNOVA-DAYS** — programmation embarquée C/C++
- Étudiant en **Master 1 Mention STIC**, parcours Télécommunications et Réseaux, ESP Antsiranana

---

### SECTION "Projets" — liste avec lien + description + badges shadcn

Format de chaque item :
```
[Nom](url)          ← lien cliquable + IconExternalLink
Description courte en une phrase.
Stack : <Badge variant="outline"> par technologie
```

| Projet | URL | Description | Stack |
|--------|-----|-------------|-------|
| **SalonAtlas** | https://salon-atlas.mada-digital.xyz/ | Annuaire des salons de coiffure à Madagascar. Réalisé chez Mada Digital. | Next.js, TypeScript, Tailwind CSS |
| **Skolara** | https://skolara.vercel.app/ | Plateforme éducative scolaire & préscolaire : calendrier, actualités, pré-inscription, blog. | Next.js, TypeScript, Tailwind CSS |
| **DocuLink** | projet Licence | Bibliothèque virtuelle pour consulter et gérer livres, mémoires et thèses. | Next.js, Node.js, MySQL, API REST |
| **MeetSpace** | hackathon / perso | Prototype de réservation de salles — gestion événements, disponibilité. MVP 48h. | React, Node.js |
| **CV Builder** | projet personnel | App web de création et export de CV en PDF. Formulaires validés, composants réutilisables. | React, TypeScript, Tailwind CSS |
| **Hackathon Redshalk** | — | Plateforme de découverte touristique (2ème place). Prototype front-end 48h. | React, Tailwind CSS |

---

### SECTION "Expérience" — chronologie verticale fine

```
Stage — Mada Digital · Antananarivo            En cours (2025 – présent)
  Développement front-end (SalonAtlas, Skolara),
  intégration de maquettes, déploiement.
  → mada-digital.net

Stage — Nisasarana SARLU · Ivato Antananarivo  11/2025 – 12/2025
  Développement front-end, maintenance informatique,
  certification interne obtenue.

Hackathon Redshalk · Antsiranana               08/2025
  Développeur front-end principal. 2ème place.

Atelier Arduino INNOVA-DAYS · ESP              03/2025
  Programmation embarquée Arduino C/C++.
```

---

### SECTION "Tech" — liste avec icône + description

```
Next.js          → Framework principal, App Router
React.js         → UI composant-driven
TypeScript       → JavaScript robuste et typé
Tailwind CSS     → Styling rapide et cohérent
shadcn/ui        → Composants accessibles et stylés
Node.js          → APIs REST backend
MySQL            → Base de données relationnelle
Python           → Scripts et automatisation
Arduino C/C++    → Électronique embarquée
UML / Merise     → Modélisation applicative
```

---

### SECTION "Formation"

```
Master 1 — Mention STIC                       2025 – en cours
  Parcours : Télécommunications et Réseaux
  Ecole Supérieure Polytechnique, Antsiranana

Licence — Génie Électrique et Technologie     2022 – 2025
  Parcours : Electronique Informatique et Technologie
  Ecole Supérieure Polytechnique, Antsiranana

Baccalauréat Série D                          2020
  Collège Saint Joseph, Fianarantsoa
```

---

### SECTION "Langues"

```
🇲🇬 Malagasy — Natif
🇫🇷 Français  — Courant
🇬🇧 Anglais   — Intermédiaire
```

---

### SECTION "Contact"

```
"Get in touch"

IconMail    → normanvonizara@gmail.com   (mailto: cliquable)
IconPhone   → +261 34 30 638 17
IconBrandGithub   → github.com/normanXCat
IconBrandLinkedin → linkedin.com/in/norman-vonizara-07b96b36a/
```

---

### FOOTER

```
© 2025 Norman Vonizara · Antsiranana, Madagascar
```

---

## EXEMPLE HERO ATTENDU

```tsx
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export function Hero() {
  return (
    <section className="flex flex-col gap-6 pt-24 pb-16">
      <div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight font-display">
          Norman Vonizara
        </h1>
        <p className="text-zinc-400 text-xl mt-2">
          Développeur Full-Stack · Frontend Focused
        </p>
      </div>

      <p className="text-zinc-400 max-w-lg leading-relaxed">
        Passionné par les interfaces utilisateurs, l'électronique embarquée
        et les réseaux. Actuellement en stage chez{" "}
        <a
          href="https://www.mada-digital.net"
          className="text-zinc-200 underline underline-offset-4 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mada Digital
        </a>
        .
      </p>

      <div className="flex gap-5">
        <a
          href="https://github.com/normanXCat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-1.5 text-sm"
        >
          <IconBrandGithub size={16} stroke={1.5} />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/norman-vonizara-07b96b36a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-1.5 text-sm"
        >
          <IconBrandLinkedin size={16} stroke={1.5} />
          LinkedIn
        </a>
        <a
          href="mailto:normanvonizara@gmail.com"
          className="text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-1.5 text-sm"
        >
          <IconMail size={16} stroke={1.5} />
          Email
        </a>
      </div>

      <p className="text-xs text-zinc-600">
        Antsiranana, Madagascar · Disponible pour un stage
      </p>
    </section>
  );
}
```

---

## RÈGLES DE CODE OBLIGATOIRES

- ✅ TypeScript strict partout — pas de `any`
- ✅ `cn()` de shadcn/ui pour les classes conditionnelles
- ✅ Chaque section est un composant isolé dans `/components`
- ✅ Icônes : **uniquement `@tabler/icons-react`** — pas de lucide-react
- ✅ Séparateurs : `<Separator className="my-12 opacity-20" />`
- ✅ Liens externes : `target="_blank" rel="noopener noreferrer"`
- ✅ Mobile-first, responsive (`max-w-2xl mx-auto px-4`)
- ✅ Génère l'intégralité du code, **fichier par fichier**, dans cet ordre :
  1. `app/layout.tsx`
  2. `app/page.tsx`
  3. `components/hero.tsx`
  4. `components/about.tsx`
  5. `components/projects.tsx`
  6. `components/experience.tsx`
  7. `components/skills.tsx`
  8. `components/contact.tsx`
  9. `components/tech-badge.tsx`

### metadata dans `layout.tsx`

```ts
export const metadata: Metadata = {
  title: "Norman Vonizara — Développeur Full-Stack",
  description:
    "Portfolio de Norman Vonizara, développeur full-stack frontend spécialisé Next.js, React et TypeScript.",
  openGraph: {
    title: "Norman Vonizara — Développeur Full-Stack",
    description: "Portfolio de Norman Vonizara.",
    url: "https://normanvonizara.dev",
    locale: "fr_FR",
    type: "website",
  },
};
```

---

*Généré pour Norman Vonizara · Master 1 STIC Télécommunications & Réseaux · ESP Antsiranana*
