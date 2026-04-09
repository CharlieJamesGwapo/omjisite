const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{
      background: '#070b14',
      borderTop: '1px solid rgba(14,165,233,0.1)',
      padding: '3rem 0 1.5rem'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Brand */}
          <div style={{ maxWidth: '280px' }}>
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '1rem' }}>
              <img src="/assets/legoo.jpeg" alt="OMji" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(14,165,233,0.3)' }} />
              <span style={{
                fontSize: '1.1rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #ffffff, #c0c8d8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em'
              }}>OMji Solutions</span>
            </a>
            <p style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.75 }}>
              Professional software development company building digital solutions that power businesses forward.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#8b95a5', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {footerLinks.map(link => (
                <a key={link.label} href={link.href} style={{
                  color: '#6b7280', fontSize: '0.825rem', textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#0ea5e9'}
                onMouseLeave={e => e.target.style.color = '#6b7280'}
                >{link.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#8b95a5', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: '#6b7280', fontSize: '0.825rem' }}>📞 09655343312</p>
              <p style={{ color: '#6b7280', fontSize: '0.825rem' }}>📧 contact@omji.dev</p>
              <p style={{ color: '#6b7280', fontSize: '0.825rem' }}>🇵🇭 Philippines</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="glow-line mb-5" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p style={{ color: '#4b5563', fontSize: '0.775rem' }}>
            Copyright &copy; OMji {new Date().getFullYear()}. All rights reserved.
          </p>
          <p style={{ color: '#4b5563', fontSize: '0.775rem' }}>
            Made with ❤️ by OMji Software Development
          </p>
        </div>
      </div>
    </footer>
  )
}
