import Link from 'next/link';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#141210] text-[#F5F0E6]">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#1A1816]/90 backdrop-blur-md border-b border-[#3A3632]/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm tracking-wider uppercase text-[#F5F0E6] hover:text-[#C9A84C] transition-colors"
          >
            <span className="w-2.5 h-2.5 bg-[#C9A84C] rounded-full group-hover:scale-125 transition-transform" />
            <span className="font-light">Han</span>
            <span className="text-[#8A7E6E] text-xs">/ Island of Memory</span>
          </Link>

          <nav aria-label="Marketing Navigation">
            <ul className="flex items-center gap-6 text-xs uppercase tracking-wider">
              <li>
                <Link href="/services" className="text-[#A89E8E] hover:text-[#F5F0E6] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[#A89E8E] hover:text-[#F5F0E6] transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#A89E8E] hover:text-[#F5F0E6] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="px-3.5 py-1.5 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A1816] transition-all"
                >
                  Brief
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#3A3632]/40 bg-[#110F0E] py-12 text-xs text-[#8A7E6E]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-[#F5F0E6] uppercase tracking-wider block mb-1">
              Han — Creative Technologist
            </span>
            <p>Direct remote consulting & engineering globally.</p>
          </div>

          <div className="flex items-center gap-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-[#F5F0E6] transition-colors">
              3D Experience
            </Link>
            <Link href="/services" className="hover:text-[#F5F0E6] transition-colors">
              Services
            </Link>
            <Link href="/projects" className="hover:text-[#F5F0E6] transition-colors">
              Work
            </Link>
            <Link href="/contact" className="hover:text-[#C9A84C] transition-colors text-[#C9A84C]">
              Inquire
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
