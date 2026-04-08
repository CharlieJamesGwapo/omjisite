import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProjectsManager from '../admin/ProjectsManager'
import ContactMessages from '../admin/ContactMessages'
import TestimonialsManager from '../admin/TestimonialsManager'
import CertificationsManager from '../admin/CertificationsManager'

const tabs = ['Projects', 'Messages', 'Testimonials', 'Certifications']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Projects')
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-navy">
      <div className="flex">
        <aside className="w-64 bg-navy-light border-r border-border min-h-screen p-6 hidden md:block">
          <div className="flex items-center gap-3 mb-8">
            <img src="/assets/legoo.jpeg" alt="OMji" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold">OMji</p>
              <p className="text-xs text-muted">Admin Panel</p>
            </div>
          </div>
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab ? 'bg-cyan/10 text-cyan font-bold' : 'text-muted hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="w-full mt-8 text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <div className="flex gap-2 mb-6 md:hidden overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  activeTab === tab ? 'gradient-btn !py-2' : 'bg-card border border-border text-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Projects' && <ProjectsManager />}
          {activeTab === 'Messages' && <ContactMessages />}
          {activeTab === 'Testimonials' && <TestimonialsManager />}
          {activeTab === 'Certifications' && <CertificationsManager />}
        </main>
      </div>
    </div>
  )
}
