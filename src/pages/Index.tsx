import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MeshBackground from "@/components/MeshBackground";
import VideoPresentation from "@/components/VideoPresentation";
import LiveFlow from "@/components/LiveFlow";
import VerticalStream from "@/components/VerticalStream";
import InfraFeatures from "@/components/InfraFeatures";
import SafetyKernel from "@/components/SafetyKernel";
import ProtocolSwitcher from "@/components/ProtocolSwitcher";
import GuardDashboard from "@/components/GuardDashboard";
import MCPToolHighlight from "@/components/MCPToolHighlight";
import TrustedBy from "@/components/TrustedBy";
import QuickStart from "@/components/QuickStart";
import GlobalStandards from "@/components/GlobalStandards";
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
        <section id="infrastructure">
          <InfraFeatures />
        </section>
        <section id="protocol">
          <ProtocolSwitcher />
        </section>
        <section id="mcp">
          <MCPToolHighlight />
        </section>
        <section id="quickstart">
          <QuickStart />
        </section>
        <section id="video">
          <VideoPresentation />
        </section>
        <section id="liveflow">
          <LiveFlow />
        </section>
        <section id="safety">
          <SafetyKernel />
        </section>
        {/* <VerticalStream /> */}
        <section id="dashboard">
          <GuardDashboard />
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
