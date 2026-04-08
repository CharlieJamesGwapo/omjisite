import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Problems from '../components/Problems'
import Services from '../components/Services'
import WhyChoose from '../components/WhyChoose'
import Projects from '../components/Projects'
import TechStack from '../components/TechStack'
import VendoSystem from '../components/VendoSystem'
import Testimonials from '../components/Testimonials'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Problems />
      <Services />
      <WhyChoose />
      <Projects />
      <TechStack />
      <VendoSystem />
      <Testimonials />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}
