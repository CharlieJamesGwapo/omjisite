import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

const EMPTY = { clientName:'', company:'', quote:'', rating:5 }
const inp = (extra={}) => ({
  width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
  borderRadius:'8px', padding:'0.7rem 0.875rem', color:'white', fontSize:'0.85rem',
  outline:'none', boxSizing:'border-box', transition:'border-color 0.2s',
  fontFamily:"'Inter',sans-serif", ...extra
})
const focus = e => e.target.style.borderColor = 'rgba(14,165,233,0.5)'
const blur  = e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'

export default function TestimonialsManager() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
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
    api.get('/api/testimonials').then(res => setItems(res.data)).finally(() => setLoading(false))
  }
  const showToast = (msg, type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000) }
  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal(true) }
  const openEdit = t => { setForm({clientName:t.clientName, company:t.company||'', quote:t.quote, rating:t.rating}); setEditing(t.id); setModal(true) }
  const closeModal = () => { setModal(false); setEditing(null) }

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      if (editing) await api.put(`/api/testimonials/${editing}`, form, { headers })
      else await api.post('/api/testimonials', form, { headers })
      closeModal(); load(); showToast(editing ? 'Testimonial updated!' : 'Testimonial added!')
    } catch (err) { showToast(err.response?.data?.error || err.message, 'error') }
    setSaving(false)
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return
    try { await api.delete(`/api/testimonials/${id}`, { headers }); load(); showToast('Deleted') }
    catch (err) { showToast(err.response?.data?.error || err.message, 'error') }
  }

  return (
    <div>
      {toast && (
        <div style={{ position:'fixed', top:'1.5rem', right:'1.5rem', zIndex:1000, background:toast.type==='error'?'rgba(239,68,68,0.9)':'rgba(16,185,129,0.9)', color:'white', padding:'0.75rem 1.25rem', borderRadius:'10px', fontSize:'0.85rem', fontWeight:600, boxShadow:'0 8px 30px rgba(0,0,0,0.3)' }}>
          {toast.type==='error'?'❌':'✅'} {toast.msg}
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'12px' }}>
        <p style={{ color:'#6b7280', fontSize:'0.85rem' }}>{items.length} testimonial{items.length!==1?'s':''}</p>
        <button onClick={openAdd} className="gradient-btn" style={{ padding:'0.55rem 1.25rem', fontSize:'0.85rem' }}>+ Add Testimonial</button>
      </div>

      {loading ? (
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {[1,2,3].map(i=><div key={i} style={{ height:'100px', background:'rgba(255,255,255,0.03)', borderRadius:'12px', animation:'pulse 1.5s ease-in-out infinite' }} />)}
        </div>
      ) : items.length === 0 ? (
        <div style={{ textAlign:'center', padding:'4rem', background:'rgba(22,27,34,0.5)', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize:'2rem', marginBottom:'1rem' }}>⭐</p>
          <p style={{ color:'#6b7280' }}>No testimonials yet.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {items.map((t, i) => (
            <div key={t.id} style={{
              background:'rgba(22,27,34,0.8)', border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'14px', padding:'1.125rem', display:'flex', gap:'12px', alignItems:'flex-start'
            }}>
              {/* Avatar */}
              <div style={{
                width:'44px', height:'44px', borderRadius:'50%', flexShrink:0,
                background: i%2===0 ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'linear-gradient(135deg,#6366f1,#ec4899)',
                display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:'1rem'
              }}>{t.clientName?.charAt(0)?.toUpperCase()}</div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'2px', flexWrap:'wrap' }}>
                  <span style={{ fontWeight:700, fontSize:'0.9rem' }}>{t.clientName}</span>
                  {t.company && <span style={{ color:'#6b7280', fontSize:'0.775rem' }}>· {t.company}</span>}
                  <span style={{ color:'#f59e0b', fontSize:'0.8rem', marginLeft:'auto' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</span>
                </div>
                <p style={{ color:'#8b95a5', fontSize:'0.8rem', lineHeight:1.6,
                  display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'
                }}>"{t.quote}"</p>
              </div>

              <div style={{ display:'flex', gap:'6px', flexShrink:0 }}>
                <button onClick={()=>openEdit(t)} style={{ padding:'0.4rem 0.75rem', borderRadius:'8px', border:'1px solid rgba(14,165,233,0.3)', background:'rgba(14,165,233,0.08)', color:'#0ea5e9', fontSize:'0.75rem', fontWeight:600, cursor:'pointer' }}>✏</button>
                <button onClick={()=>handleDelete(t.id,t.clientName)} style={{ padding:'0.4rem 0.75rem', borderRadius:'8px', border:'1px solid rgba(239,68,68,0.2)', background:'rgba(239,68,68,0.06)', color:'#ef4444', fontSize:'0.75rem', fontWeight:600, cursor:'pointer' }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div style={{ position:'fixed', inset:0, zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)', padding:'1rem' }}
          onClick={e => e.target===e.currentTarget && closeModal()}>
          <div style={{ background:'#0d1117', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'18px', width:'100%', maxWidth:'500px', maxHeight:'90vh', overflowY:'auto', padding:'1.75rem', boxShadow:'0 30px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <h3 style={{ fontWeight:800, fontSize:'1.1rem', fontFamily:"'Space Grotesk',sans-serif" }}>{editing?'✏ Edit Testimonial':'+ New Testimonial'}</h3>
              <button onClick={closeModal} style={{ background:'rgba(255,255,255,0.06)', border:'none', color:'#8b95a5', borderRadius:'8px', width:'32px', height:'32px', cursor:'pointer', fontSize:'1rem' }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <div>
                  <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Client Name *</label>
                  <input placeholder="John Doe" required value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})} style={inp()} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Company</label>
                  <input placeholder="Company Inc." value={form.company} onChange={e=>setForm({...form,company:e.target.value})} style={inp()} onFocus={focus} onBlur={blur} />
                </div>
              </div>

              <div>
                <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Quote *</label>
                <textarea placeholder="What they said about OMji..." required rows={4} value={form.quote} onChange={e=>setForm({...form,quote:e.target.value})} style={{ ...inp(), resize:'none' }} onFocus={focus} onBlur={blur} />
              </div>

              <div>
                <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Rating</label>
                <div style={{ display:'flex', gap:'8px' }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={()=>setForm({...form,rating:n})} style={{
                      fontSize:'1.5rem', background:'none', border:'none', cursor:'pointer',
                      color: n<=form.rating ? '#f59e0b' : '#374151', transition:'color 0.1s, transform 0.1s',
                      transform: n<=form.rating ? 'scale(1.15)' : 'scale(1)'
                    }}>★</button>
                  ))}
                  <span style={{ color:'#6b7280', fontSize:'0.8rem', alignSelf:'center', marginLeft:'4px' }}>{form.rating}/5</span>
                </div>
              </div>

              <div style={{ display:'flex', gap:'10px', marginTop:'4px' }}>
                <button type="submit" disabled={saving} className="gradient-btn" style={{ flex:1, opacity:saving?0.7:1 }}>
                  {saving?'Saving...':editing?'✓ Update':'+ Add'}
                </button>
                <button type="button" onClick={closeModal} style={{ flex:1, padding:'0.75rem', borderRadius:'10px', border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'#8b95a5', cursor:'pointer', fontSize:'0.875rem' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}
