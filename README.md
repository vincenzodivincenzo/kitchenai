# KitchenAi

Recipe app built from the KitchenAi Figma prototype: log in, pick what is in your pantry, get recipes you can cook right now, and follow them step by step.

Screens: splash, login, home (Desayuno / Almuerzo / Cena), despensa (pantry with voice input), recetas sugeridas, recipe ingredients, recipe steps, favoritos, perfil.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`. `vercel.json` rewrites every path to `index.html` so client-side routes work on Vercel.

## Stack

Vite, React 19, TypeScript, React Router. State (session, favorites, pantry selection, ratings) lives in React context and persists to `localStorage`. Photos are served from Unsplash.
