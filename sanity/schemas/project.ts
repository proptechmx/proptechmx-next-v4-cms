import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 64 }, validation: r => r.required() }),
    defineField({ name: 'city', title: 'Ciudad', type: 'string' }),
    defineField({ name: 'status', title: 'Estatus', type: 'string', options: { list: ['Abierto','Cerrado','Próximo'] } }),
    defineField({ name: 'tir', title: 'TIR Estimada (%)', type: 'number' }),
    defineField({ name: 'termMonths', title: 'Plazo (meses)', type: 'number' }),
    defineField({ name: 'minTicket', title: 'Ticket mínimo (MXN)', type: 'number' }),
    defineField({ name: 'goal', title: 'Meta de inversión (MXN)', type: 'number' }),
    defineField({ name: 'funded', title: 'Monto financiado (MXN)', type: 'number' }),
    defineField({ name: 'risk', title: 'Riesgo', type: 'string', options: { list: ['Bajo','Medio','Alto'] } }),
    defineField({ name: 'summary', title: 'Resumen breve', type: 'text' }),
    defineField({ name: 'coverImage', title: 'Imagen de portada', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'documents', title: 'Documentos (PDFs)', type: 'array', of: [{ type: 'file', options: { accept: 'application/pdf' } }] }),
  ],
})