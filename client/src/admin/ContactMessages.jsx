import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function ContactMessages() {
  const { token } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all | unread | read
  const [expanded, setExpanded] = useState(null)
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    api.get('/api/contact', { headers })
      .then(res => setMessages(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const markRead = async (id) => {
    try {
      await api.put(`/api/contact/${id}/read`, {}, { headers })
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await api.delete(`/api/contact/${id}`, { headers })
      setMessages(prev => prev.filter(m => m.id !== id))
      if (expanded === id) setExpanded(null)
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  const toggle = (id) => {
    setExpanded(prev => prev === id ? null : id)
    const msg = messages.find(m => m.id === id)
    if (msg && !msg.read) markRead(id)
  }

  const unread = messages.filter(m => !m.read).length
  const filtered = messages.filter(m => {
    if (filter === 'unread') return !m.read
    if (filter === 'read') return m.read
    return true
  })

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
          Contact Messages
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '4px' }}>
          Messages submitted from the website contact form
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: messages.length, color: '#0ea5e9' },
          { label: 'Unread', value: unread, color: '#f59e0b' },
          { label: 'Read', value: messages.length - unread, color: '#10b981' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'rgba(22,27,34,0.8)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px', padding: '1rem 1.5rem', minWidth: '100px', flex: '1'
          }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: stat.color, fontFamily: "'Space Grotesk', sans-serif" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem' }}>
        {['all', 'unread', 'read'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600,
            cursor: 'pointer', border: 'none', textTransform: 'capitalize',
            background: filter === f ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'rgba(255,255,255,0.05)',
            color: filter === f ? 'white' : '#8b95a5',
            transition: 'all 0.2s'
          }}>
            {f} {f === 'unread' && unread > 0 ? `(${unread})` : ''}
          </button>
        ))}
      </div>

      {/* Messages list */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ height: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '4rem 2rem',
          background: 'rgba(22,27,34,0.5)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            {filter === 'all' ? 'No messages yet.' : `No ${filter} messages.`}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(m => (
            <div
              key={m.id}
              style={{
                background: 'rgba(22,27,34,0.8)',
                border: `1px solid ${!m.read ? 'rgba(14,165,233,0.25)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: !m.read ? '0 0 0 1px rgba(14,165,233,0.05), 0 4px 20px rgba(14,165,233,0.05)' : 'none'
              }}
            >
              {/* Message header row — always visible */}
              <button
                onClick={() => toggle(m.id)}
                style={{
                  width: '100%', textAlign: 'left', padding: '1rem 1.25rem',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '12px'
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  background: !m.read ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: '0.9rem'
                }}>
                  {m.name?.charAt(0)?.toUpperCase() || '?'}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#ffffff' }}>{m.name}</span>
                    {!m.read && (
                      <span style={{
                        fontSize: '0.6rem', fontWeight: 700, color: '#0ea5e9',
                        background: 'rgba(14,165,233,0.12)', padding: '1px 7px',
                        borderRadius: '100px', border: '1px solid rgba(14,165,233,0.2)'
                      }}>NEW</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.775rem' }}>{m.email}</span>
                    {m.subject && (
                      <>
                        <span style={{ color: '#374151', fontSize: '0.7rem' }}>·</span>
                        <span style={{ color: '#8b95a5', fontSize: '0.775rem', fontWeight: 500 }}>{m.subject}</span>
                      </>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <span style={{ color: '#6b7280', fontSize: '0.7rem' }}>{formatDate(m.createdAt)}</span>
                  <span style={{
                    color: '#6b7280', fontSize: '0.75rem',
                    transform: expanded === m.id ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s', display: 'inline-block'
                  }}>▾</span>
                </div>
              </button>

              {/* Expanded content */}
              {expanded === m.id && (
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.01)'
                }}>
                  <p style={{
                    color: '#c0c8d8', fontSize: '0.875rem', lineHeight: 1.75,
                    marginBottom: '1.25rem', whiteSpace: 'pre-wrap'
                  }}>
                    {m.message}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a
                      href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || 'Your inquiry')}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                        color: 'white', padding: '0.45rem 1rem', borderRadius: '8px',
                        fontSize: '0.775rem', fontWeight: 600, textDecoration: 'none',
                        transition: 'opacity 0.2s'
                      }}
                    >
                      ✉ Reply via Email
                    </a>

                    {!m.read && (
                      <button onClick={() => markRead(m.id)} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: 'rgba(16,185,129,0.1)', color: '#10b981',
                        padding: '0.45rem 1rem', borderRadius: '8px',
                        fontSize: '0.775rem', fontWeight: 600, border: '1px solid rgba(16,185,129,0.2)',
                        cursor: 'pointer', transition: 'background 0.2s'
                      }}>
                        ✓ Mark Read
                      </button>
                    )}

                    <button onClick={() => handleDelete(m.id)} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: 'rgba(239,68,68,0.08)', color: '#ef4444',
                      padding: '0.45rem 1rem', borderRadius: '8px',
                      fontSize: '0.775rem', fontWeight: 600, border: '1px solid rgba(239,68,68,0.15)',
                      cursor: 'pointer', transition: 'background 0.2s'
                    }}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
