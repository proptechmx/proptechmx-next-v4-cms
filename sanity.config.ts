import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

// ⬇️ IMPORTA DESDE TU CARPETA REAL
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'proptechmx',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,          // OK
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',// ⬅️ corregido (SANITY)

  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
})