import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MeshBackground from "@/components/MeshBackground";
import VideoPresentation from "@/components/VideoPresentation";
import LiveFlow from "@/components/LiveFlow";
import TrustedBy from "@/components/TrustedBy";
import GlobalStandards from "@/components/GlobalStandards";
import ERC8004TrustGate from "@/components/ERC8004TrustGate";
import SiteFooter from "@/components/SiteFooter";
import SideNavigation from "@/components/SideNavigation";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />
        <SideNavigation />
        <section id="hero">
          <HeroSection />
        </section>
        <section id="video">
          <VideoPresentation />
        </section>
        <section id="trust-gate">
          <ERC8004TrustGate />
        </section>
        <section id="liveflow">
          <LiveFlow />
        </section>
        <section id="standards">
          <GlobalStandards />
        </section>
        <section id="trusted">
          <TrustedBy />
        </section>
        <SiteFooter />
      </div>
    </div>
  );
};

export default Index;
