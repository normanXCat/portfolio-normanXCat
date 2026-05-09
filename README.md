# Norman Vonizara — Portfolio personnel

Un portfolio minimaliste, moderne et performant conçu pour présenter mon profil de Développeur Full-Stack / Étudiant en Télécommunications et Réseaux.

## 🚀 Fonctionnalités clés & Techniques avancées

- **Design Premium & Minimaliste :** Interface épurée avec une forte attention portée aux détails typographiques et visuels (utilisation de polices optimisées `Pangolin` et `Advent_Pro`).
- **Animations Fluides :** Intégration de `framer-motion` pour des transitions de section douces et des apparitions dynamiques au scroll (`whileInView`).
- **Thème Sombre / Clair (View Transitions) :** Bascule instantanée entre le mode clair et sombre grâce à l'**API View Transitions** native du navigateur. L'effet de transition est personnalisé via des masques SVG et des fonctions d'accélération (timing functions) customisées `linear()` pour un effet "ripple" parfait et fluide.
- **Architecture Data-Driven (SSR) :** Tout le contenu (Bio, Projets, Expériences, Compétences) est centralisé dans un fichier JSON (`public/data.json`), lu côté serveur avec `fs.promises.readFile` dans `page.tsx`, puis injecté dans les composants clients. Cela garantit un rendu initial rapide (SSR) et un excellent SEO.
- **Badges de Technologies Dynamiques :** Le composant `TechBadge` intègre un mapping intelligent. Il suffit de taper le nom d'une technologie (ex: "Next.js", "Docker", "Machine Learning") pour qu'il affiche automatiquement l'icône correspondante via la librairie `@tabler/icons-react`.
- **Responsive Design :** Expérience utilisateur fluide sur mobile, tablette et desktop avec des classes Tailwind adaptatives.

## 🛠️ Stack Technique

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components)
- **Librairie UI:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icônes:** [Tabler Icons](https://tabler.io/icons)
- **Typographie:** Google Fonts (`next/font/google`)

## 📁 Architecture et Gestion des données

Le portfolio est divisé en composants modulaires (`Hero`, `About`, `Experience`, `Projects`, `Skills`, `Education`, `Contact`).
Pour mettre à jour les informations de votre portfolio, il n'est pas nécessaire de toucher au code React. Toutes les données sont gérées dans le fichier `public/data.json`.

```json
// Exemple de modification des données dans public/data.json
{
  "hero": {
    "name": "Norman Vonizara",
    "bio": "Alliant une expertise en développement Web & Mobile..."
  },
  "skills": [
    {
      "name": "Docker",
      "desc": "Conteneurisation d'applications",
      "icon": "IconBrandDocker"
    }
  ]
}
```

La lecture est orchestrée par le fichier racine `src/app/page.tsx` :
```tsx
export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);
  
  return (
    <>
      <Hero data={data.hero} />
      <Projects data={data.projects} />
      {/* ... */}
    </>
  );
}
```

## 💻 Installation & Lancement en local

1. Cloner le dépôt
```bash
git clone https://github.com/normanXCat/portfolio-normanXCat.git
cd portfolio-normanXCat
```

2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

3. Lancer le serveur de développement
```bash
npm run dev
# ou
yarn dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## 🤝 Contact

- **Email:** normanvonizara@gmail.com
- **LinkedIn:** [Norman Vonizara](https://linkedin.com/in/norman-vonizara-07b96b36a/)
- **GitHub:** [normanXCat](https://github.com/normanXCat)
