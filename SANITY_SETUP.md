# Sanity CMS – Configuración

1) Crea cuenta en https://sanity.io, proyecto y dataset `production`. Consigue tu **Project ID**.
2) En `.env.local` agrega:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=TU_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
3) `npm install` y `npm run dev`. Abre `/studio` para el panel.
4) Crea **Site Settings**, **Legal Doc** (PDFs) y **Project** (con slug).
5) Home `/` leerá proyectos del CMS (si hay). `Metodología` listará documentos legales.
