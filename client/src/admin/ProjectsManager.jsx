import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function ProjectsManager() {
  const { token } = useAuth()
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: '', subtitle: '', category: 'webapp', description: '',
    techTags: '', gradientFrom: '#0ea5e9', gradientTo: '#6366f1',
    demoUrl: '', urlBadge: '', featured: false
  })

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => { loadProjects() }, [])

  const loadProjects = () => {
    api.get('/api/projects').then(res => setProjects(res.data))
  }

  const resetForm = () => {
    setForm({ title: '', subtitle: '', category: 'webapp', description: '', techTags: '', gradientFrom: '#0ea5e9', gradientTo: '#6366f1', demoUrl: '', urlBadge: '', featured: false })
    setEditing(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...form, techTags: JSON.stringify(form.techTags.split(',').map(t => t.trim()).filter(Boolean)) }
    try {
      if (editing) {
        await api.put(`/api/projects/${editing}`, data, { headers })
      } else {
        await api.post('/api/projects', data, { headers })
      }
      resetForm()
      loadProjects()
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleEdit = (p) => {
    setEditing(p.id)
    setForm({ ...p, techTags: Array.isArray(p.techTags) ? p.techTags.join(', ') : '' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await api.delete(`/api/projects/${id}`, { headers })
      loadProjects()
    } catch (err) {
      alert('Error deleting project: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>

      <form onSubmit={handleSubmit} className="card p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <input placeholder="Subtitle" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white focus:border-cyan focus:outline-none">
            <option value="webapp">Web App</option>
            <option value="mobile">Mobile</option>
            <option value="system">System</option>
          </select>
          <input placeholder="URL Badge (e.g. myapp.vercel.app)" value={form.urlBadge} onChange={e => setForm({ ...form, urlBadge: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
        </div>
        <textarea placeholder="Description" required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none resize-none" />
        <input placeholder="Tech Tags (comma separated)" value={form.techTags} onChange={e => setForm({ ...form, techTags: e.target.value })} className="w-full bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Demo URL" value={form.demoUrl} onChange={e => setForm({ ...form, demoUrl: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <div className="flex gap-2 items-center">
            <label className="text-sm text-muted">From:</label>
            <input type="color" value={form.gradientFrom} onChange={e => setForm({ ...form, gradientFrom: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
            <label className="text-sm text-muted">To:</label>
            <input type="color" value={form.gradientTo} onChange={e => setForm({ ...form, gradientTo: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
            Featured Project
          </label>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="gradient-btn !py-2">{editing ? 'Update' : 'Add'} Project</button>
          {editing && <button type="button" onClick={resetForm} className="outline-btn !py-2">Cancel</button>}
        </div>
      </form>

      <div className="space-y-3">
        {projects.map(p => (
          <div key={p.id} className="card p-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold">{p.title} {p.featured && <span className="text-xs text-warning">(Featured)</span>}</h4>
              <p className="text-muted text-sm">{p.category} - {p.techTags?.join(', ')}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="text-cyan text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-red-400 text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
