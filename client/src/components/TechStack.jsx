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
    <section id="techstack" className="py-20" style={{ background: '#0a0e1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-label">Technologies We Use</span>
          <h2 className="section-title">Skills & Tech Stack</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="card p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `linear-gradient(135deg, ${cat.color}, ${cat.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg">{cat.name}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cat.tags.map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
