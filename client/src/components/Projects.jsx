import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const filters = ['All', 'Web Apps', 'Mobile', 'Systems']
const filterMap = { 'All': null, 'Web Apps': 'webapp', 'Mobile': 'mobile', 'Systems': 'system' }

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === filterMap[activeFilter])

  const liveCount = projects.filter(p => p.demoUrl && p.demoUrl.startsWith('http')).length
  const mobileCount = projects.filter(p => p.category === 'mobile').length
  const systemCount = projects.filter(p => p.category === 'system').length

  return (
    <section id="projects" className="py-20" style={{ background: '#0d1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p style={{ color: '#6b7280' }}>Websites, apps, and systems we've built</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={activeFilter === filter ? {
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                color: 'white',
                fontWeight: 700,
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem'
              } : {
                background: '#161b22',
                color: '#8b95a5',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid #21262d',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => { if (activeFilter !== filter) e.target.style.color = 'white' }}
              onMouseLeave={e => { if (activeFilter !== filter) e.target.style.color = '#8b95a5' }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        {loading ? (
          <div className="text-center py-12" style={{ color: '#8b95a5' }}>Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="sync">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id || project.title}
                  className="card overflow-hidden"
                  style={{ display: 'flex', flexDirection: 'column' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(14,165,233,0.08)' }}
                >
                  {/* Gradient Header */}
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${project.gradientFrom || '#0ea5e9'}, ${project.gradientTo || '#6366f1'})`,
                      padding: '1.25rem',
                      position: 'relative'
                    }}
                  >
                    {/* Browser dots decoration */}
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                      {project.urlBadge && (
                        <span style={{ marginLeft: '8px', fontSize: '10px', background: 'rgba(0,0,0,0.25)', padding: '2px 8px', borderRadius: '10px', color: 'white' }}>
                          {project.urlBadge}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', margin: 0 }}>{project.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>{project.subtitle}</span>
                      {project.featured && (
                        <span style={{ fontSize: '9px', background: '#f59e0b', color: 'black', padding: '2px 6px', borderRadius: '3px', fontWeight: 700 }}>
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: '#8b95a5', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.75rem', flex: 1 }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
                      {project.techTags?.map(tag => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {project.demoUrl && project.demoUrl.startsWith('http') ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gradient-btn"
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '0.5rem',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <ExternalLinkIcon /> Live Demo
                        </a>
                      ) : (
                        <div style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '0.5rem',
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          background: '#161b22',
                          border: '1px solid #21262d',
                          borderRadius: '6px',
                          color: '#8b95a5'
                        }}>
                          <LinkIcon /> Private / NDA
                        </div>
                      )}
                      <button style={{
                        width: '38px',
                        background: '#161b22',
                        border: '1px solid #21262d',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#8b95a5'
                      }}>
                        <LinkIcon />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Stats Counter */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: `${projects.length}+`, label: 'Total Projects', color: '#0ea5e9' },
            { value: `${liveCount}+`, label: 'Live Websites', color: '#6366f1' },
            { value: `${mobileCount}+`, label: 'Mobile Apps', color: '#10b981' },
            { value: `${systemCount}+`, label: 'Systems Built', color: '#f59e0b' },
          ].map(stat => (
            <div key={stat.label} className="card text-center" style={{ padding: '1rem 2rem' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
