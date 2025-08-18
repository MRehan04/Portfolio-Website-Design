import { Navigation } from "./components/Navigation"
import { HeroSection } from "./components/HeroSection"
import { AboutSection } from "./components/AboutSection"
import { ContactSection } from "./components/ContactSection"
import { SkillsSection } from "./components/SkillsSection"
import { ProjectsSection } from "./components/ProjectsSection"
import { Footer } from './components/Footer'
import './styles/globals.css'

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
