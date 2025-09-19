// import { Navigation } from "./components/Navigation"
// import { HeroSection } from "./components/HeroSection"
// import { AboutSection } from "./components/AboutSection"
// import { ContactSection } from "./components/ContactSection"
// import { SkillsSection } from "./components/SkillsSection"
// import { ProjectsSection } from "./components/ProjectsSection"
// import { PortfolioSection } from "./components/PortfolioSection"
// import { Footer } from './components/Footer'
// import './styles/globals.css'

// function App() {
//   return (
//     <div className="min-h-screen">
//       <Navigation />
//       <main>
//         <HeroSection />
//         <AboutSection />
//         <SkillsSection />
//         <PortfolioSection />
//         <ProjectsSection />
//         <ContactSection />
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default App

import { Router } from './components/Router.tsx';

export default function App() {
  return <Router />;
}