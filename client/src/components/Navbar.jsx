import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: 'background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(10,14,26,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(14,165,233,0.1), 0 4px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: '-2px', borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #0ea5e9, #6366f1, #0ea5e9)',
                animation: 'spin 6s linear infinite', opacity: 0.6
              }} />
              <img src="/assets/legoo.jpeg" alt="OMji" style={{
                position: 'relative', width: '38px', height: '38px',
                borderRadius: '50%', zIndex: 1, display: 'block'
              }} />
            </div>
            <span style={{
              fontSize: '1.25rem', fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff, #c0c8d8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.02em'
            }}>OMji</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  color: '#8b95a5', fontSize: '0.825rem', fontWeight: 500,
                  padding: '0.4rem 0.75rem', borderRadius: '6px',
                  textDecoration: 'none', transition: 'all 0.2s',
                  fontFamily: "'Inter', sans-serif"
                }}
                onMouseEnter={e => { e.target.style.color = '#ffffff'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { e.target.style.color = '#8b95a5'; e.target.style.background = 'transparent' }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="gradient-btn"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.825rem', marginLeft: '0.5rem' }}
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <span style={{
              display: 'block', width: '22px', height: '2px', background: '#ffffff', borderRadius: '2px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: isOpen ? 'rotate(45deg) translate(3px, 4px)' : 'none'
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px', background: '#ffffff', borderRadius: '2px',
              transition: 'opacity 0.3s',
              opacity: isOpen ? 0 : 1
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px', background: '#ffffff', borderRadius: '2px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: isOpen ? 'rotate(-45deg) translate(3px, -4px)' : 'none'
            }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              background: 'rgba(10,14,26,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(14,165,233,0.1)'
            }}
          >
            <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    display: 'block', padding: '0.75rem 0',
                    color: '#c0c8d8', fontSize: '0.9rem', fontWeight: 500,
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href="#contact"
                className="gradient-btn text-center"
                style={{ display: 'block', marginTop: '1.25rem', padding: '0.75rem' }}
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </nav>
  )
}
