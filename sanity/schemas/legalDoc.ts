import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'legalDoc',
  title: 'Documento Legal',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: r => r.required() }),
    defineField({ name: 'category', title: 'Categoría', type: 'string', options: { list: ['Términos','Privacidad','Metodología','Contrato','Otro'] } }),
    defineField({ name: 'updatedAt', title: 'Fecha actualización', type: 'datetime' }),
    defineField({ name: 'file', title: 'Archivo (PDF)', type: 'file', options: { accept: 'application/pdf' }, validation: r => r.required() }),
  ],
})