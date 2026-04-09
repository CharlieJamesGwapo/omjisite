import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

const EMPTY = { title:'', subtitle:'', category:'webapp', description:'', techTags:'', gradientFrom:'#0ea5e9', gradientTo:'#6366f1', demoUrl:'', urlBadge:'', featured:false }

const inp = (extra={}) => ({
  width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
  borderRadius:'8px', padding:'0.7rem 0.875rem', color:'white', fontSize:'0.85rem',
  outline:'none', boxSizing:'border-box', transition:'border-color 0.2s',
  fontFamily:"'Inter',sans-serif", ...extra
})
const focus = e => e.target.style.borderColor = 'rgba(14,165,233,0.5)'
const blur  = e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'

const catColors = { webapp:'#0ea5e9', mobile:'#ec4899', system:'#10b981' }
const catLabels = { webapp:'Web App', mobile:'Mobile', system:'System' }

export default function ProjectsManager() {
  const { token } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => { load() }, [])

  const load = () => {
    setLoading(true)
    api.get('/api/projects').then(res => setProjects(res.data)).finally(() => setLoading(false))
  }

  const showToast = (msg, type='success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal(true) }
  const openEdit = p => {
    setForm({ ...p, techTags: Array.isArray(p.techTags) ? p.techTags.join(', ') : '' })
    setEditing(p.id); setModal(true)
  }
  const closeModal = () => { setModal(false); setEditing(null) }

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    const data = { ...form, techTags: JSON.stringify(form.techTags.split(',').map(t=>t.trim()).filter(Boolean)) }
    try {
      if (editing) await api.put(`/api/projects/${editing}`, data, { headers })
      else await api.post('/api/projects', data, { headers })
      closeModal(); load()
      showToast(editing ? 'Project updated!' : 'Project added!')
    } catch (err) {
      showToast(err.response?.data?.error || err.message, 'error')
    }
    setSaving(false)
  }

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    try {
      await api.delete(`/api/projects/${id}`, { headers })
      load(); showToast('Project deleted')
    } catch (err) {
      showToast(err.response?.data?.error || err.message, 'error')
    }
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed', top:'1.5rem', right:'1.5rem', zIndex:1000,
          background: toast.type === 'error' ? 'rgba(239,68,68,0.9)' : 'rgba(16,185,129,0.9)',
          color:'white', padding:'0.75rem 1.25rem', borderRadius:'10px',
          fontSize:'0.85rem', fontWeight:600, boxShadow:'0 8px 30px rgba(0,0,0,0.3)'
        }}>{toast.type==='error'?'❌':'✅'} {toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'12px' }}>
        <p style={{ color:'#6b7280', fontSize:'0.85rem' }}>{projects.length} project{projects.length!==1?'s':''} total</p>
        <button onClick={openAdd} className="gradient-btn" style={{ padding:'0.55rem 1.25rem', fontSize:'0.85rem' }}>
          + Add Project
        </button>
      </div>

      {/* Projects grid */}
      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'12px' }}>
          {[1,2,3].map(i=>(
            <div key={i} style={{ height:'140px', background:'rgba(255,255,255,0.03)', borderRadius:'12px', animation:'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign:'center', padding:'4rem', background:'rgba(22,27,34,0.5)', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize:'2rem', marginBottom:'1rem' }}>📁</p>
          <p style={{ color:'#6b7280' }}>No projects yet. Add your first one!</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'12px' }}>
          {projects.map(p => (
            <div key={p.id} style={{
              background:'rgba(22,27,34,0.8)', border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'14px', overflow:'hidden',
              transition:'border-color 0.2s, transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(14,165,233,0.2)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}
            >
              {/* Gradient header */}
              <div style={{ height:'60px', background:`linear-gradient(135deg,${p.gradientFrom},${p.gradientTo})`, position:'relative' }}>
                {p.featured && (
                  <span style={{
                    position:'absolute', top:'8px', right:'8px',
                    background:'rgba(255,255,255,0.2)', color:'white',
                    fontSize:'0.6rem', fontWeight:700, padding:'2px 8px', borderRadius:'100px'
                  }}>★ FEATURED</span>
                )}
              </div>
              <div style={{ padding:'1rem' }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'8px', marginBottom:'8px' }}>
                  <div>
                    <h4 style={{ fontWeight:700, fontSize:'0.9rem', marginBottom:'2px' }}>{p.title}</h4>
                    <p style={{ color:'#6b7280', fontSize:'0.75rem' }}>{p.subtitle}</p>
                  </div>
                  <span style={{
                    background:`${catColors[p.category]}18`, color:catColors[p.category],
                    fontSize:'0.6rem', fontWeight:700, padding:'2px 8px', borderRadius:'100px',
                    border:`1px solid ${catColors[p.category]}30`, whiteSpace:'nowrap', flexShrink:0
                  }}>{catLabels[p.category]}</span>
                </div>
                <p style={{ color:'#6b7280', fontSize:'0.75rem', lineHeight:1.5, marginBottom:'10px',
                  display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'
                }}>{p.description}</p>
                <div style={{ display:'flex', gap:'8px' }}>
                  <button onClick={() => openEdit(p)} style={{
                    flex:1, padding:'0.5rem', borderRadius:'8px', border:'1px solid rgba(14,165,233,0.3)',
                    background:'rgba(14,165,233,0.08)', color:'#0ea5e9',
                    fontSize:'0.775rem', fontWeight:600, cursor:'pointer', transition:'background 0.2s'
                  }}>✏ Edit</button>
                  <button onClick={() => handleDelete(p.id, p.title)} style={{
                    flex:1, padding:'0.5rem', borderRadius:'8px', border:'1px solid rgba(239,68,68,0.2)',
                    background:'rgba(239,68,68,0.06)', color:'#ef4444',
                    fontSize:'0.775rem', fontWeight:600, cursor:'pointer', transition:'background 0.2s'
                  }}>🗑 Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={{
          position:'fixed', inset:0, zIndex:500, display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)', padding:'1rem'
        }} onClick={e => e.target === e.currentTarget && closeModal()}>
          <div style={{
            background:'#0d1117', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'18px',
            width:'100%', maxWidth:'580px', maxHeight:'90vh', overflowY:'auto',
            padding:'1.75rem', boxShadow:'0 30px 80px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <h3 style={{ fontWeight:800, fontSize:'1.1rem', fontFamily:"'Space Grotesk',sans-serif" }}>
                {editing ? '✏ Edit Project' : '+ New Project'}
              </h3>
              <button onClick={closeModal} style={{ background:'rgba(255,255,255,0.06)', border:'none', color:'#8b95a5', borderRadius:'8px', width:'32px', height:'32px', cursor:'pointer', fontSize:'1rem' }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <div>
                  <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Title *</label>
                  <input placeholder="Project Title" required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={inp()} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Subtitle</label>
                  <input placeholder="e.g. Full Stack App" value={form.subtitle} onChange={e=>setForm({...form,subtitle:e.target.value})} style={inp()} onFocus={focus} onBlur={blur} />
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <div>
                  <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Category</label>
                  <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={{ ...inp(), cursor:'pointer' }} onFocus={focus} onBlur={blur}>
                    <option value="webapp">Web App</option>
                    <option value="mobile">Mobile</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>URL Badge</label>
                  <input placeholder="e.g. myapp.vercel.app" value={form.urlBadge} onChange={e=>setForm({...form,urlBadge:e.target.value})} style={inp()} onFocus={focus} onBlur={blur} />
                </div>
              </div>

              <div>
                <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Description *</label>
                <textarea placeholder="Describe the project..." required rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{ ...inp(), resize:'none' }} onFocus={focus} onBlur={blur} />
              </div>

              <div>
                <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Tech Tags (comma separated)</label>
                <input placeholder="React, Node.js, PostgreSQL" value={form.techTags} onChange={e=>setForm({...form,techTags:e.target.value})} style={inp()} onFocus={focus} onBlur={blur} />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'10px', alignItems:'end' }}>
                <div>
                  <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Demo URL</label>
                  <input placeholder="https://..." value={form.demoUrl} onChange={e=>setForm({...form,demoUrl:e.target.value})} style={inp()} onFocus={focus} onBlur={blur} />
                </div>
                <label style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'0.8rem', color:'#c0c8d8', cursor:'pointer', whiteSpace:'nowrap', paddingBottom:'2px' }}>
                  <input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} />
                  Featured
                </label>
              </div>

              {/* Gradient preview */}
              <div>
                <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Card Gradient</label>
                <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <span style={{ fontSize:'0.75rem', color:'#6b7280' }}>From</span>
                    <input type="color" value={form.gradientFrom} onChange={e=>setForm({...form,gradientFrom:e.target.value})} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', background:'none' }} />
                  </div>
                  <div style={{ height:'36px', flex:1, borderRadius:'8px', background:`linear-gradient(135deg,${form.gradientFrom},${form.gradientTo})` }} />
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <span style={{ fontSize:'0.75rem', color:'#6b7280' }}>To</span>
                    <input type="color" value={form.gradientTo} onChange={e=>setForm({...form,gradientTo:e.target.value})} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', background:'none' }} />
                  </div>
                </div>
              </div>

              <div style={{ display:'flex', gap:'10px', marginTop:'4px' }}>
                <button type="submit" disabled={saving} className="gradient-btn" style={{ flex:1, opacity:saving?0.7:1, cursor:saving?'not-allowed':'pointer' }}>
                  {saving ? 'Saving...' : editing ? '✓ Update Project' : '+ Add Project'}
                </button>
                <button type="button" onClick={closeModal} style={{
                  flex:1, padding:'0.75rem', borderRadius:'10px', border:'1px solid rgba(255,255,255,0.1)',
                  background:'rgba(255,255,255,0.04)', color:'#8b95a5', cursor:'pointer', fontSize:'0.875rem'
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}
