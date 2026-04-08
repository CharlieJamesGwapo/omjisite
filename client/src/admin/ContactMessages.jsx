import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function ContactMessages() {
  const { token } = useAuth()
  const [messages, setMessages] = useState([])
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get('/api/contact', { headers }).then(res => setMessages(res.data))
  }, [])

  const markRead = async (id) => {
    await axios.put(`/api/contact/${id}/read`, {}, { headers })
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    await axios.delete(`/api/contact/${id}`, { headers })
    setMessages(messages.filter(m => m.id !== id))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Messages ({messages.filter(m => !m.read).length} unread)</h2>
      <div className="space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`card p-5 ${!m.read ? 'border-cyan/30' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold">{m.name} {!m.read && <span className="text-xs text-cyan ml-2">NEW</span>}</h4>
                <p className="text-muted text-sm">{m.email}</p>
              </div>
              <p className="text-muted text-xs">{new Date(m.createdAt).toLocaleDateString()}</p>
            </div>
            {m.subject && <p className="text-silver text-sm font-bold mb-1">{m.subject}</p>}
            <p className="text-muted text-sm mb-3">{m.message}</p>
            <div className="flex gap-3">
              {!m.read && <button onClick={() => markRead(m.id)} className="text-cyan text-xs hover:underline">Mark Read</button>}
              <button onClick={() => handleDelete(m.id)} className="text-red-400 text-xs hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-muted text-center py-8">No messages yet.</p>}
      </div>
    </div>
  )
}
