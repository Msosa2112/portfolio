import React, { useState } from 'react';
import ThreeDHoverGallery from './ThreeDHoverGallery';
import SandboxModal from './sandbox/SandboxModal';
import ZHomesSandboxModal from './sandbox/ZHomesSandboxModal';

const PROJECT_ITEMS = [
  {
    url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2371&auto=format&fit=crop",
    title: "Barba Construction CRM",
    category: "CRM / Web App",
    description: "A modern, AI-powered CRM built for construction professionals, featuring a highly intuitive UI and real-time data sync via Supabase.",
    glow: "rgba(94,106,210,0.35)"
  },
  {
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2346&auto=format&fit=crop",
    title: "ZHomes TC Platform",
    category: "Real Estate Platform",
    description: "Global transaction coordinator platform featuring an integrated AI Copilot for real estate professionals.",
    glow: "rgba(6,182,212,0.35)"
  },
  {
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2340&auto=format&fit=crop",
    title: "Edward Siding & Gutters",
    category: "Marketing / SEO",
    description: "A highly optimized marketing landing page with custom SEO, robots.txt, and a spectacular photo gallery.",
    glow: "rgba(245,158,11,0.35)"
  },
  {
    url: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2342&auto=format&fit=crop",
    title: "Outdoor Advertising MS",
    category: "Microservices / APIs",
    description: "Microservice integration for scalable DOOH (Digital Out of Home) advertising platforms.",
    glow: "rgba(16,185,129,0.35)"
  }
];

const Projects = () => {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isZhomesOpen, setIsZhomesOpen] = useState(false);

  return (
    <section id="work" className="projects-section">
      <div className="projects-header">
        <h2 className="section-title">Selected <span className="text-gradient">Work</span></h2>
        <p className="section-subtitle">A collection of software systems and platforms designed and built with precision.</p>
      </div>

      <div className="gallery-wrapper">
        <ThreeDHoverGallery
          items={PROJECT_ITEMS}
          itemHeight={480}
          gap={14}
          perspective={1200}
          hoverScale={1.03}
          transitionDuration={0.4}
          onExploreClick={(index, item) => {
            if (item.title.includes("Barba")) {
              setIsSandboxOpen(true);
            } else if (item.title.includes("ZHomes")) {
              setIsZhomesOpen(true);
            }
          }}
        />
      </div>

      <SandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

      <ZHomesSandboxModal
        isOpen={isZhomesOpen}
        onClose={() => setIsZhomesOpen(false)}
      />

      <style>{`
        .projects-section {
          width: 100%;
          max-width: 1200px;
          padding: 8rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .projects-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 500px;
          line-height: 1.6;
        }

        .gallery-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </section>
  );
};

export default Projects;
