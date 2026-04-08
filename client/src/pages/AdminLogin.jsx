import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login', { username, password })
      login(data.token)
      navigate('/admin')
    } catch {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/assets/legoo.jpeg" alt="OMji" className="w-20 h-20 rounded-full mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-muted text-sm">Sign in to manage your website</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-navy border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:border-cyan focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-navy border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:border-cyan focus:outline-none"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="gradient-btn w-full">Sign In</button>
        </form>
      </div>
    </div>
  )
}
