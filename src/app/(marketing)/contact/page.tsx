import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Han — Builder of Worlds',
  description: 'Get in touch for web development, AI filmmaking, creative technology projects.',
};

/**
 * Contact page — SSG, accessible without 3D.
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-3xl font-light tracking-tight mb-8">Get in Touch</h1>

      <form className="w-full max-w-md space-y-6" action="/api/contact" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm text-[#A89E8E] mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-transparent border border-[#3A3632] px-4 py-2
                       text-[#F5F0E6] focus:border-[#C9A84C] focus:outline-none
                       transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-[#A89E8E] mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-transparent border border-[#3A3632] px-4 py-2
                       text-[#F5F0E6] focus:border-[#C9A84C] focus:outline-none
                       transition-colors"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-[#A89E8E] mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full bg-transparent border border-[#3A3632] px-4 py-2
                       text-[#F5F0E6] focus:border-[#C9A84C] focus:outline-none
                       transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 text-sm tracking-wider uppercase
                     bg-[#C9A84C] text-[#1A1816] hover:bg-[#C9A84C]/80
                     transition-colors"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
