import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

const EMPTY = { title:'', issuer:'', type:'completion' }
const inp = (extra={}) => ({
  width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
  borderRadius:'8px', padding:'0.7rem 0.875rem', color:'white', fontSize:'0.85rem',
  outline:'none', boxSizing:'border-box', transition:'border-color 0.2s',
  fontFamily:"'Inter',sans-serif", ...extra
})
const focus = e => e.target.style.borderColor = 'rgba(14,165,233,0.5)'
const blur  = e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'

const typeConfig = {
  completion:   { color:'#10b981', gradient:'linear-gradient(135deg,#10b981,#059669)', icon:'🎓', label:'Certified' },
  recognition:  { color:'#f59e0b', gradient:'linear-gradient(135deg,#f59e0b,#d97706)', icon:'🏆', label:'Recognition' },
  participation:{ color:'#0ea5e9', gradient:'linear-gradient(135deg,#0ea5e9,#0284c7)', icon:'📋', label:'Participation' },
}

export default function CertificationsManager() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [filter, setFilter] = useState('all')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => { load() }, [])
  const load = () => {
    setLoading(true)
    api.get('/api/certifications').then(res => setItems(res.data)).finally(() => setLoading(false))
  }
  const showToast = (msg, type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000) }
  const openAdd = () => { setForm(EMPTY); setEditing(null); setModal(true) }
  const openEdit = c => { setForm({title:c.title,issuer:c.issuer,type:c.type}); setEditing(c.id); setModal(true) }
  const closeModal = () => { setModal(false); setEditing(null) }

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      if (editing) await api.put(`/api/certifications/${editing}`, form, { headers })
      else await api.post('/api/certifications', form, { headers })
      closeModal(); load(); showToast(editing?'Updated!':'Added!')
    } catch (err) { showToast(err.response?.data?.error||err.message,'error') }
    setSaving(false)
  }

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    try { await api.delete(`/api/certifications/${id}`, { headers }); load(); showToast('Deleted') }
    catch (err) { showToast(err.response?.data?.error||err.message,'error') }
  }

  const filtered = filter === 'all' ? items : items.filter(c => c.type === filter)

  return (
    <div>
      {toast && (
        <div style={{ position:'fixed', top:'1.5rem', right:'1.5rem', zIndex:1000, background:toast.type==='error'?'rgba(239,68,68,0.9)':'rgba(16,185,129,0.9)', color:'white', padding:'0.75rem 1.25rem', borderRadius:'10px', fontSize:'0.85rem', fontWeight:600, boxShadow:'0 8px 30px rgba(0,0,0,0.3)' }}>
          {toast.type==='error'?'❌':'✅'} {toast.msg}
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
          {['all','completion','recognition','participation'].map(f => (
            <button key={f} onClick={()=>setFilter(f)} style={{
              padding:'0.35rem 0.875rem', borderRadius:'8px', border:'none', cursor:'pointer',
              background: filter===f ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.04)',
              color: filter===f ? '#0ea5e9' : '#6b7280', fontSize:'0.75rem', fontWeight:filter===f?700:500,
              textTransform:'capitalize', transition:'all 0.15s'
            }}>{f === 'all' ? `All (${items.length})` : f}</button>
          ))}
        </div>
        <button onClick={openAdd} className="gradient-btn" style={{ padding:'0.55rem 1.25rem', fontSize:'0.85rem' }}>+ Add Certification</button>
      </div>

      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'10px' }}>
          {[1,2,3].map(i=><div key={i} style={{ height:'80px', background:'rgba(255,255,255,0.03)', borderRadius:'12px', animation:'pulse 1.5s ease-in-out infinite' }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'4rem', background:'rgba(22,27,34,0.5)', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize:'2rem', marginBottom:'1rem' }}>🏆</p>
          <p style={{ color:'#6b7280' }}>No {filter==='all'?'certifications':`${filter} certifications`} yet.</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'10px' }}>
          {filtered.map(c => {
            const cfg = typeConfig[c.type] || typeConfig.completion
            return (
              <div key={c.id} style={{
                background:'rgba(22,27,34,0.8)', border:`1px solid ${cfg.color}25`,
                borderRadius:'14px', padding:'1rem', display:'flex', gap:'12px', alignItems:'flex-start',
                borderLeft:`3px solid ${cfg.color}60`, transition:'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 8px 30px ${cfg.color}12`}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
              >
                <div style={{ width:'40px', height:'40px', flexShrink:0, borderRadius:'10px', background:cfg.gradient, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', boxShadow:`0 4px 12px ${cfg.color}30` }}>
                  {cfg.icon}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <h4 style={{ fontWeight:700, fontSize:'0.825rem', marginBottom:'2px', lineHeight:1.3 }}>{c.title}</h4>
                  <p style={{ color:'#6b7280', fontSize:'0.7rem', marginBottom:'6px' }}>{c.issuer}</p>
                  <span style={{ fontSize:'0.6rem', fontWeight:700, color:cfg.color, background:`${cfg.color}12`, padding:'2px 8px', borderRadius:'100px', border:`1px solid ${cfg.color}20` }}>
                    {cfg.label}
                  </span>
                </div>
                <div style={{ display:'flex', gap:'4px', flexShrink:0 }}>
                  <button onClick={()=>openEdit(c)} style={{ padding:'0.35rem 0.6rem', borderRadius:'8px', border:'1px solid rgba(14,165,233,0.3)', background:'rgba(14,165,233,0.08)', color:'#0ea5e9', fontSize:'0.7rem', cursor:'pointer' }}>✏</button>
                  <button onClick={()=>handleDelete(c.id,c.title)} style={{ padding:'0.35rem 0.6rem', borderRadius:'8px', border:'1px solid rgba(239,68,68,0.2)', background:'rgba(239,68,68,0.06)', color:'#ef4444', fontSize:'0.7rem', cursor:'pointer' }}>🗑</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <div style={{ position:'fixed', inset:0, zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)', padding:'1rem' }}
          onClick={e => e.target===e.currentTarget && closeModal()}>
          <div style={{ background:'#0d1117', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'18px', width:'100%', maxWidth:'460px', padding:'1.75rem', boxShadow:'0 30px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <h3 style={{ fontWeight:800, fontSize:'1.1rem', fontFamily:"'Space Grotesk',sans-serif" }}>{editing?'✏ Edit Certification':'+ New Certification'}</h3>
              <button onClick={closeModal} style={{ background:'rgba(255,255,255,0.06)', border:'none', color:'#8b95a5', borderRadius:'8px', width:'32px', height:'32px', cursor:'pointer', fontSize:'1rem' }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <div>
                <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Title *</label>
                <input placeholder="Certificate or Award Title" required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={inp()} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Issuer *</label>
                <input placeholder="Issuing Organization" required value={form.issuer} onChange={e=>setForm({...form,issuer:e.target.value})} style={inp()} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={{ color:'#6b7280', fontSize:'0.7rem', fontWeight:600, display:'block', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Type</label>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
                  {Object.entries(typeConfig).map(([key,cfg])=>(
                    <button key={key} type="button" onClick={()=>setForm({...form,type:key})} style={{
                      padding:'0.6rem', borderRadius:'10px', border:`2px solid ${form.type===key?cfg.color:cfg.color+'30'}`,
                      background: form.type===key?`${cfg.color}15`:'rgba(255,255,255,0.02)',
                      cursor:'pointer', transition:'all 0.15s',
                      display:'flex', flexDirection:'column', alignItems:'center', gap:'4px'
                    }}>
                      <span style={{ fontSize:'1.25rem' }}>{cfg.icon}</span>
                      <span style={{ fontSize:'0.65rem', fontWeight:700, color:form.type===key?cfg.color:'#6b7280' }}>{cfg.label}</span>
                    </button>
                  ))}
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
