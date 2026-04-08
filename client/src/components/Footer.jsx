export default function Footer() {
  return (
    <footer style={{ background: '#0a0e1a', borderTop: '1px solid #21262d', padding: '1.5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="/assets/legoo.jpeg" alt="OMji" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
            <span style={{ color: '#8b95a5', fontSize: '0.875rem' }}>
              Copyright &copy; OMji 2018 - {new Date().getFullYear()}. All rights reserved.
            </span>
          </div>
          <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>Made with ❤️ by OMji Software Development</p>
        </div>
      </div>
    </footer>
  )
}
