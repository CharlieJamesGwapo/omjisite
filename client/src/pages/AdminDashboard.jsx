import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProjectsManager from '../admin/ProjectsManager'
import ContactMessages from '../admin/ContactMessages'
import TestimonialsManager from '../admin/TestimonialsManager'
import CertificationsManager from '../admin/CertificationsManager'
import api from '../lib/api'

const tabs = [
  { id: 'Projects', icon: '📁', label: 'Projects' },
  { id: 'Messages', icon: '✉️', label: 'Messages' },
  { id: 'Testimonials', icon: '⭐', label: 'Testimonials' },
  { id: 'Certifications', icon: '🏆', label: 'Certifications' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Projects')
  const [unread, setUnread] = useState(0)
  const { logout, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/contact', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUnread(res.data.filter(m => !m.read).length))
      .catch(() => {})
  }, [activeTab])

  const handleLogout = () => { logout(); navigate('/admin/login') }

  return (
    <div style={{ minHeight:'100vh', background:'#070b14', display:'flex', flexDirection:'column' }}>
      {/* Mobile top bar */}
      <header style={{
        display:'none', position:'sticky', top:0, zIndex:50,
        background:'rgba(7,11,20,0.95)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(255,255,255,0.06)',
        padding:'0.875rem 1rem', alignItems:'center', justifyContent:'space-between'
      }} className="mobile-header">
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <img src="/assets/legoo.jpeg" alt="OMji" style={{ width:'32px', height:'32px', borderRadius:'50%', border:'1px solid rgba(14,165,233,0.3)' }} />
          <span style={{ fontWeight:800, fontFamily:"'Space Grotesk',sans-serif", fontSize:'1rem' }}>Admin Panel</span>
        </div>
        <button onClick={handleLogout} style={{
          background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)',
          color:'#ef4444', borderRadius:'8px', padding:'0.4rem 0.85rem',
          fontSize:'0.775rem', fontWeight:600, cursor:'pointer'
        }}>Logout</button>
      </header>

      <div style={{ display:'flex', flex:1 }}>
        {/* Desktop Sidebar */}
        <aside style={{
          width:'240px', background:'rgba(13,17,23,0.95)',
          borderRight:'1px solid rgba(255,255,255,0.06)',
          minHeight:'100vh', padding:'1.5rem 1rem',
          display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh'
        }} className="desktop-sidebar">
          {/* Brand */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'2rem', padding:'0 0.5rem' }}>
            <div style={{ position:'relative' }}>
              <div style={{
                position:'absolute', inset:'-2px', borderRadius:'50%',
                background:'conic-gradient(from 0deg,#0ea5e9,#6366f1,#0ea5e9)',
                animation:'spin 6s linear infinite', opacity:0.7
              }} />
              <img src="/assets/legoo.jpeg" alt="OMji" style={{ position:'relative', zIndex:1, width:'38px', height:'38px', borderRadius:'50%' }} />
            </div>
            <div>
              <p style={{ fontWeight:800, fontSize:'0.95rem', fontFamily:"'Space Grotesk',sans-serif" }}>OMji</p>
              <p style={{ color:'#6b7280', fontSize:'0.7rem' }}>Admin Panel</p>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:'4px' }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                width:'100%', textAlign:'left', padding:'0.65rem 0.875rem',
                borderRadius:'10px', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', gap:'10px',
                background: activeTab === tab.id ? 'rgba(14,165,233,0.12)' : 'transparent',
                color: activeTab === tab.id ? '#0ea5e9' : '#8b95a5',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize:'0.875rem', transition:'all 0.15s',
                position:'relative'
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ fontSize:'1rem' }}>{tab.icon}</span>
                {tab.label}
                {tab.id === 'Messages' && unread > 0 && (
                  <span style={{
                    marginLeft:'auto', background:'#ef4444', color:'white',
                    fontSize:'0.6rem', fontWeight:800, borderRadius:'100px',
                    padding:'1px 6px', minWidth:'18px', textAlign:'center'
                  }}>{unread}</span>
                )}
                {activeTab === tab.id && (
                  <div style={{
                    position:'absolute', left:0, top:'20%', bottom:'20%',
                    width:'3px', background:'#0ea5e9', borderRadius:'0 3px 3px 0'
                  }} />
                )}
              </button>
            ))}
          </nav>

          <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'1rem', marginTop:'1rem' }}>
            <a href="/" target="_blank" style={{
              display:'flex', alignItems:'center', gap:'8px',
              padding:'0.6rem 0.875rem', borderRadius:'8px', marginBottom:'4px',
              color:'#6b7280', fontSize:'0.8rem', textDecoration:'none',
              transition:'color 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
            >🌐 View Website</a>
            <button onClick={handleLogout} style={{
              width:'100%', textAlign:'left', padding:'0.6rem 0.875rem', borderRadius:'8px',
              background:'transparent', border:'none', cursor:'pointer',
              color:'#ef4444', fontSize:'0.8rem', transition:'background 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >🚪 Logout</button>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex:1, padding:'2rem', overflowY:'auto', maxWidth:'100%', minWidth:0 }}>
          {/* Page header */}
          <div style={{ marginBottom:'1.75rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ fontSize:'1.5rem' }}>{tabs.find(t=>t.id===activeTab)?.icon}</span>
              <h1 style={{ fontSize:'1.5rem', fontWeight:800, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:'-0.02em' }}>
                {activeTab}
              </h1>
            </div>
          </div>

          {activeTab === 'Projects' && <ProjectsManager />}
          {activeTab === 'Messages' && <ContactMessages onRead={() => setUnread(p => Math.max(0, p-1))} />}
          {activeTab === 'Testimonials' && <TestimonialsManager />}
          {activeTab === 'Certifications' && <CertificationsManager />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav style={{
        display:'none', position:'fixed', bottom:0, left:0, right:0, zIndex:50,
        background:'rgba(7,11,20,0.97)', backdropFilter:'blur(16px)',
        borderTop:'1px solid rgba(255,255,255,0.08)',
        padding:'0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom))'
      }} className="mobile-nav">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'3px',
            background:'transparent', border:'none', cursor:'pointer',
            color: activeTab === tab.id ? '#0ea5e9' : '#6b7280',
            fontSize:'0.6rem', fontWeight: activeTab === tab.id ? 700 : 500,
            padding:'0.4rem 0', position:'relative', transition:'color 0.15s'
          }}>
            <span style={{ fontSize:'1.3rem', lineHeight:1 }}>{tab.icon}</span>
            {tab.label}
            {tab.id === 'Messages' && unread > 0 && (
              <span style={{
                position:'absolute', top:'2px', right:'calc(50% - 18px)',
                background:'#ef4444', color:'white', fontSize:'0.55rem',
                fontWeight:800, borderRadius:'100px', padding:'1px 5px', minWidth:'16px', textAlign:'center'
              }}>{unread}</span>
            )}
          </button>
        ))}
      </nav>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
          .mobile-nav { display: flex !important; }
          main { padding: 1rem 1rem 5rem !important; }
        }
      `}</style>
    </div>
  )
}
