import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const filters = ['All', 'Web Apps', 'Mobile', 'Systems']
const filterMap = { 'All': null, 'Web Apps': 'webapp', 'Mobile': 'mobile', 'Systems': 'system' }

function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function StatCard({ value, label, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{
        background: '#161b22',
        border: '1px solid #21262d',
        borderRadius: '16px',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        minWidth: '140px',
        flex: '1'
      }}
    >
      <div style={{ fontSize: '2rem', fontWeight: 800, color, marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.05em' }}>{label}</div>
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const [imgIndex, setImgIndex] = useState(0)
  const hasScreenshots = project.screenshots && project.screenshots.length > 0

  const nextImg = (e) => {
    e.preventDefault()
    setImgIndex(i => (i + 1) % project.screenshots.length)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      style={{
        background: '#161b22',
        border: '1px solid #21262d',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}
    >
      {/* Gradient Header */}
      <div style={{
        background: `linear-gradient(135deg, ${project.gradientFrom || '#0ea5e9'}, ${project.gradientTo || '#6366f1'})`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Browser bar */}
        <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
          {project.urlBadge && (
            <span style={{
              marginLeft: '6px', fontSize: '9px',
              background: 'rgba(0,0,0,0.3)', padding: '2px 10px',
              borderRadius: '20px', color: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(4px)'
            }}>
              {project.urlBadge}
            </span>
          )}
          {project.featured && (
            <span style={{
              marginLeft: 'auto', fontSize: '8px', fontWeight: 700,
              background: '#f59e0b', color: '#000',
              padding: '2px 8px', borderRadius: '4px'
            }}>FEATURED</span>
          )}
        </div>

        {/* Screenshot or title block */}
        {hasScreenshots ? (
          <div style={{ position: 'relative' }}>
            <img
              src={project.screenshots[imgIndex]}
              alt={project.title}
              style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.style.display = 'none' }}
            />
            {project.screenshots.length > 1 && (
              <button
                onClick={nextImg}
                style={{
                  position: 'absolute', right: '8px', bottom: '8px',
                  background: 'rgba(0,0,0,0.55)', color: 'white',
                  border: 'none', borderRadius: '20px',
                  padding: '3px 10px', fontSize: '10px', cursor: 'pointer',
                  backdropFilter: 'blur(4px)'
                }}
              >
                {imgIndex + 1}/{project.screenshots.length}
              </button>
            )}
          </div>
        ) : (
          <div style={{ padding: '4px 14px 14px' }}>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem', margin: 0 }}>{project.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '3px' }}>{project.subtitle}</p>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.92rem', margin: '0 0 4px' }}>{project.title}</h3>
          <p style={{ color: '#8b95a5', fontSize: '0.78rem', lineHeight: 1.65, margin: 0 }}>
            {project.description}
          </p>
        </div>

        {/* Tech Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto', paddingTop: '2px' }}>
          {project.techTags?.slice(0, 4).map(tag => (
            <span key={tag} style={{
              fontSize: '10px', padding: '3px 8px',
              background: 'rgba(14,165,233,0.07)',
              border: '1px solid rgba(14,165,233,0.18)',
              borderRadius: '20px', color: '#8b95a5'
            }}>{tag}</span>
          ))}
          {project.techTags?.length > 4 && (
            <span style={{
              fontSize: '10px', padding: '3px 8px',
              background: 'rgba(99,102,241,0.07)',
              border: '1px solid rgba(99,102,241,0.18)',
              borderRadius: '20px', color: '#6366f1'
            }}>+{project.techTags.length - 4} more</span>
          )}
        </div>

        {/* CTA Button */}
        <div>
          {project.demoUrl?.startsWith('http') ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600,
                color: 'white', textDecoration: 'none', width: '100%', boxSizing: 'border-box',
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                boxShadow: '0 4px 12px rgba(14,165,233,0.2)'
              }}
            >
              <ExternalLinkIcon /> Live Demo
            </a>
          ) : (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '0.5rem', borderRadius: '8px', fontSize: '0.8rem',
              color: '#6b7280', background: '#0d1117',
              border: '1px solid #21262d', width: '100%', boxSizing: 'border-box'
            }}>
              <LockIcon /> Private / NDA
            </div>
          )}
        </div>
      </div>
    </motion.div>
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

  const liveCount = projects.filter(p => p.demoUrl?.startsWith('http')).length
  const mobileCount = projects.filter(p => p.category === 'mobile').length
  const systemCount = projects.filter(p => p.category === 'system').length

  return (
    <section id="projects" className="py-24" style={{ background: '#0d1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            Websites, apps, and systems built for real clients
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          {filters.map(filter => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={activeFilter === filter ? {
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                color: 'white', fontWeight: 700,
                padding: '0.5rem 1.5rem', borderRadius: '9999px',
                border: 'none', cursor: 'pointer', fontSize: '0.875rem',
                boxShadow: '0 4px 15px rgba(14,165,233,0.3)'
              } : {
                background: '#161b22', color: '#8b95a5',
                padding: '0.5rem 1.5rem', borderRadius: '9999px',
                border: '1px solid #21262d', cursor: 'pointer', fontSize: '0.875rem'
              }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{
                height: '340px', background: '#161b22',
                borderRadius: '16px', border: '1px solid #21262d',
                opacity: 0.5
              }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Stats */}
        {!loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '3rem', justifyContent: 'center' }}>
            <StatCard value={`${projects.length}+`} label="Total Projects" color="#0ea5e9" />
            <StatCard value={`${liveCount}+`} label="Live Websites" color="#6366f1" />
            <StatCard value={`${mobileCount}+`} label="Mobile Apps" color="#10b981" />
            <StatCard value={`${systemCount}+`} label="Systems Built" color="#f59e0b" />
          </div>
        )}
      </div>
    </section>
  )
}
