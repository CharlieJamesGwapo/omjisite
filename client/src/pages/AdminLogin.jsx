import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'

const inp = {
  width: '100%', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
  padding: '0.85rem 1rem 0.85rem 2.75rem', color: 'white',
  fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s, background 0.2s', fontFamily: "'Inter', sans-serif"
}

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const focus = e => { e.target.style.borderColor = 'rgba(14,165,233,0.6)'; e.target.style.background = 'rgba(14,165,233,0.05)' }
  const blur  = e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { data } = await api.post('/api/auth/login', { username, password })
      login(data.token)
      navigate('/admin')
    } catch {
      setError('Invalid username or password')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#070b14',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background blobs */}
      <div style={{ position:'absolute', top:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'rgba(14,165,233,0.06)', filter:'blur(80px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-80px', right:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'rgba(99,102,241,0.06)', filter:'blur(80px)', pointerEvents:'none' }} />

      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'rgba(13,17,23,0.9)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px',
        padding: '2.5rem 2rem', position: 'relative', zIndex: 1
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
            <div style={{
              position:'absolute', inset:'-3px', borderRadius:'50%',
              background:'conic-gradient(from 0deg,#0ea5e9,#6366f1,#0ea5e9)',
              animation:'spin 6s linear infinite'
            }} />
            <img src="/assets/legoo.jpeg" alt="OMji" style={{
              position:'relative', zIndex:1, width:'72px', height:'72px',
              borderRadius:'50%', display:'block'
            }} />
          </div>
          <h1 style={{ fontSize:'1.5rem', fontWeight:800, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:'-0.02em', marginBottom:'4px' }}>
            Admin Panel
          </h1>
          <p style={{ color:'#6b7280', fontSize:'0.825rem' }}>Sign in to manage OMji Solutions</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          {/* Username */}
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', fontSize:'1rem', pointerEvents:'none' }}>👤</span>
            <input
              type="text" placeholder="Username" required
              value={username} onChange={e => setUsername(e.target.value)}
              style={inp} onFocus={focus} onBlur={blur}
            />
          </div>

          {/* Password */}
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', fontSize:'1rem', pointerEvents:'none' }}>🔒</span>
            <input
              type={showPass ? 'text' : 'password'} placeholder="Password" required
              value={password} onChange={e => setPassword(e.target.value)}
              style={{ ...inp, paddingRight:'3rem' }} onFocus={focus} onBlur={blur}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{
              position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', cursor:'pointer', color:'#6b7280', fontSize:'0.85rem'
            }}>{showPass ? '🙈' : '👁'}</button>
          </div>

          {error && (
            <div style={{
              background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)',
              borderRadius:'8px', padding:'0.6rem 1rem', color:'#ef4444', fontSize:'0.825rem'
            }}>⚠ {error}</div>
          )}

          <button type="submit" disabled={loading} className="gradient-btn" style={{
            width:'100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed':'pointer',
            marginTop:'0.25rem', fontSize:'0.9rem', padding:'0.85rem'
          }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:'1.5rem', color:'#374151', fontSize:'0.75rem' }}>
          OMji Solutions Admin · Secure Access
        </p>
      </div>

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  )
}
