import { motion } from 'framer-motion'

export default function VendoSystem() {
  return (
    <section id="vendo" className="py-20" style={{ background: 'linear-gradient(180deg, #0d1117, #0a0e1a)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div className="flex-shrink-0" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ width: '280px', height: '280px', background: 'rgba(14,165,233,0.05)', border: '2px solid rgba(14,165,233,0.2)', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/assets/legoo.jpeg" alt="OMji Vendo" style={{ width: '220px', height: '220px', borderRadius: '50%' }} />
            </div>
          </motion.div>

          <motion.div className="flex-1" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="section-label">Our Product</span>
            <h2 className="section-title">OMji Vendo System</h2>
            <p style={{ color: '#c0c8d8', fontWeight: 600, marginBottom: '0.5rem' }}>Maker of Top Quality Hotspot Vendo</p>
            <p style={{ color: '#8b95a5', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Need extra income? Let your internet pay for itself. Start earning by sharing your internet
              with our WiFi Vendo system. We've been working to provide the best vendo software for
              retailers at the lowest cost possible.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: 'VLAN', label: 'No USB2LAN needed', color: '#0ea5e9' },
                { value: 'Remote', label: 'Management', color: '#6366f1' },
                { value: '24/7', label: 'Earning', color: '#10b981' },
              ].map(item => (
                <div key={item.value} className="card p-4 text-center">
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '8px', padding: '12px', marginBottom: '1.5rem' }}>
              <p style={{ color: '#f59e0b', fontSize: '0.8rem', lineHeight: 1.6 }}>
                ⚠️ Beware of fake products! Buy only from our official OMji store or authorized distributors. Visit our official OMji Facebook page for more details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="gradient-btn text-center">Inquire Now</a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="outline-btn text-center">Visit FB Page</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
