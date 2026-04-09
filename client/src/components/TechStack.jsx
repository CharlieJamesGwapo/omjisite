import { motion } from 'framer-motion'

const categories = [
  { name: 'Frontend', icon: '⚡', color: '#0ea5e9', tags: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Bootstrap', 'TypeScript', 'HTML5/CSS3'] },
  { name: 'Backend', icon: '🔧', color: '#f59e0b', tags: ['Go (Golang)', 'Node.js', 'C# / .NET', 'PHP Laravel', 'Python', 'REST API', 'JWT/OAuth'] },
  { name: 'Databases', icon: '🗄️', color: '#10b981', tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase', 'NeonDB'] },
  { name: 'Cloud & DevOps', icon: '☁️', color: '#6366f1', tags: ['AWS Lambda', 'Docker', 'Git & GitHub', 'Vercel', 'CI/CD', 'Windows Server'] },
  { name: 'Mobile', icon: '📱', color: '#ec4899', tags: ['React Native', 'Android Studio', 'Mobile UI/UX', 'API Integration'] },
  { name: 'Tools & Practices', icon: '🛠️', color: '#14b8a6', tags: ['VS Code', 'Figma', 'Agile/Scrum', 'Clean Code', 'RBAC', 'Performance Opt.'] },
]

export default function TechStack() {
  return (
    <section id="techstack" className="py-24" style={{ background: '#0a0e1a', position: 'relative', overflow: 'hidden' }}>
      {/* Background grid accent */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 60%)'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Technologies We Use</span>
          <h2 className="section-title">Skills & Tech Stack</h2>
          <p style={{ color: '#6b7280', maxWidth: '480px', margin: '0 auto', fontSize: '0.9rem', lineHeight: 1.75 }}>
            A versatile toolkit — from frontend frameworks to cloud infrastructure — ready to power any project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="glass-card p-6 card-hover"
              style={{ position: 'relative', overflow: 'hidden' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle radial glow */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '60px',
                background: `radial-gradient(ellipse at center top, ${cat.color}10 0%, transparent 80%)`,
                pointerEvents: 'none'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', position: 'relative' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                  background: `${cat.color}18`,
                  border: `1px solid ${cat.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>{cat.name}</h3>
                  <div style={{ width: '24px', height: '2px', background: cat.color, borderRadius: '2px', marginTop: '3px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {cat.tags.map(tag => (
                  <span key={tag} style={{
                    background: `${cat.color}0d`,
                    color: '#8b95a5',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    border: `1px solid ${cat.color}18`,
                    fontFamily: "'Inter', sans-serif"
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
