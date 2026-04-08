import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function TestimonialsManager() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ clientName: '', company: '', quote: '', rating: 5 })
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => { load() }, [])
  const load = () => axios.get('/api/testimonials').then(res => setItems(res.data))

  const resetForm = () => { setForm({ clientName: '', company: '', quote: '', rating: 5 }); setEditing(null) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) { await axios.put(`/api/testimonials/${editing}`, form, { headers }) }
      else { await axios.post('/api/testimonials', form, { headers }) }
      resetForm(); load()
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return
    try {
      await axios.delete(`/api/testimonials/${id}`, { headers })
      load()
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>
      <form onSubmit={handleSubmit} className="card p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Client Name" required value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
        </div>
        <textarea placeholder="Quote" required rows={3} value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} className="w-full bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none resize-none" />
        <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white focus:border-cyan focus:outline-none">
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
        </select>
        <div className="flex gap-3">
          <button type="submit" className="gradient-btn !py-2">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" onClick={resetForm} className="outline-btn !py-2">Cancel</button>}
        </div>
      </form>
      <div className="space-y-3">
        {items.map(t => (
          <div key={t.id} className="card p-4 flex justify-between items-start">
            <div>
              <h4 className="font-bold">{t.clientName}</h4>
              <p className="text-muted text-sm">{t.company} - {t.rating}★</p>
              <p className="text-muted text-xs mt-1 line-clamp-2">{t.quote}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(t.id); setForm({ clientName: t.clientName, company: t.company, quote: t.quote, rating: t.rating }) }} className="text-cyan text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(t.id)} className="text-red-400 text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
