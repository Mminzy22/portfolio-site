import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import CollaborationSection from "@/components/sections/collaboration-section"
import SkillsSection from "@/components/sections/skills-section"
import ContactSection from "@/components/sections/contact-section"
import SiteFooter from "@/components/sections/site-footer"

export default function Home() {
  return (
    <main id="top">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CollaborationSection />
      <SkillsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  )
}
