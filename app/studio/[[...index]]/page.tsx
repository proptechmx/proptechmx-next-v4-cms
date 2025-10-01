'use client'

import {Studio, defineConfig, defineType, defineField} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

// === Schemas inline (sin imports externos) ===
const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title', maxLength: 64 }, validation: r => r.required()
    }),
    defineField({ name: 'city', title: 'Ciudad', type: 'string' }),
    defineField({ name: 'status', title: 'Estatus', type: 'string',
      options: { list: ['Abierto','Cerrado','Próximo'] }
    }),
    defineField({ name: 'tir', title: 'TIR Estimada (%)', type: 'number' }),
    defineField({ name: 'termMonths', title: 'Plazo (meses)', type: 'number' }),
    defineField({ name: 'minTicket', title: 'Ticket mínimo (MXN)', type: 'number' }),
    defineField({ name: 'goal', title: 'Meta de inversión (MXN)', type: 'number' }),
    defineField({ name: 'funded', title: 'Monto financiado (MXN)', type: 'number' }),
    defineField({ name: 'risk', title: 'Riesgo', type: 'string',
      options: { list: ['Bajo','Medio','Alto'] }
    }),
    defineField({ name: 'summary', title: 'Resumen breve', type: 'text' }),
    defineField({ name: 'coverImage', title: 'Imagen de portada', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'documents', title: 'Documentos (PDFs)', type: 'array',
      of: [{ type: 'file', options: { accept: 'application/pdf' } }]
    }),
  ]
})

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Teléfono', type: 'string' }),
    defineField({ name: 'city', title: 'Ciudad', type: 'string' }),
    defineField({ name: 'address', title: 'Dirección', type: 'string' }),
  ],
})

const legalDoc = defineType({
  name: 'legalDoc',
  title: 'Documento Legal',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: r => r.required() }),
    defineField({ name: 'category', title: 'Categoría', type: 'string',
      options: { list: ['Términos','Privacidad','Metodología','Contrato','Otro'] } }),
    defineField({ name: 'updatedAt', title: 'Fecha actualización', type: 'datetime' }),
    defineField({ name: 'file', title: 'Archivo (PDF)', type: 'file',
      options: { accept: 'application/pdf' }, validation: r => r.required() }),
  ],
})

// === Config del Studio (usa variables del .env.local) ===
const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production') as string,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: { types: [project, siteSettings, legalDoc] },
})

export default function StudioPage() {
  return <Studio config={config} />
}