import {defineType, defineField} from 'sanity'
export default defineType({
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