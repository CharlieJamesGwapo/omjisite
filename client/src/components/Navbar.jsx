import { useState, useEffect } from 'react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Tech Stack', href: '#techstack' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Certifications', href: '#certifications' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,14,26,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img src="/assets/legoo.jpeg" alt="OMji" className="w-10 h-10 rounded-full border border-cyan/30" />
            <span className="text-xl font-bold text-white">OMji</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted hover:text-cyan transition-colors duration-200"
                style={{ color: '#8b95a5' }}
                onMouseEnter={e => e.target.style.color = '#0ea5e9'}
                onMouseLeave={e => e.target.style.color = '#8b95a5'}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="gradient-btn"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '500px' : '0',
          background: 'rgba(10,14,26,0.98)',
          borderTop: isOpen ? '1px solid #21262d' : 'none'
        }}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="block py-3 px-2 text-sm border-b"
              style={{ color: '#8b95a5', borderColor: '#21262d' }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="block mt-4 gradient-btn text-center"
            style={{ padding: '0.75rem' }}
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  )
}
