import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function CertificationsManager() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', issuer: '', type: 'completion' })
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => { load() }, [])
  const load = () => axios.get('/api/certifications').then(res => setItems(res.data))

  const resetForm = () => { setForm({ title: '', issuer: '', type: 'completion' }); setEditing(null) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) { await axios.put(`/api/certifications/${editing}`, form, { headers }) }
      else { await axios.post('/api/certifications', form, { headers }) }
      resetForm(); load()
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return
    try {
      await axios.delete(`/api/certifications/${id}`, { headers })
      load()
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Certifications</h2>
      <form onSubmit={handleSubmit} className="card p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <input placeholder="Issuer" required value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white focus:border-cyan focus:outline-none">
            <option value="completion">Completion</option>
            <option value="recognition">Recognition</option>
            <option value="participation">Participation</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="gradient-btn !py-2">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" onClick={resetForm} className="outline-btn !py-2">Cancel</button>}
        </div>
      </form>
      <div className="space-y-3">
        {items.map(c => (
          <div key={c.id} className="card p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-sm">{c.title}</h4>
              <p className="text-muted text-xs">{c.issuer} - {c.type}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(c.id); setForm({ title: c.title, issuer: c.issuer, type: c.type }) }} className="text-cyan text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(c.id)} className="text-red-400 text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
