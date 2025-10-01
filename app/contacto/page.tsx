import ContactForm from '@/components/ContactForm'

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Contacto</h1>
      <p className="mb-4 opacity-80">
        ¿Tienes un proyecto o deseas invertir? Envíanos un mensaje y te contactamos.
      </p>
      <ContactForm />
    </main>
  )
}
