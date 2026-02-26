import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MeshBackground from "@/components/MeshBackground";
import SafetyKernel from "@/components/SafetyKernel";
import ProtocolSwitcher from "@/components/ProtocolSwitcher";
import GuardDashboard from "@/components/GuardDashboard";
import MCPToolHighlight from "@/components/MCPToolHighlight";
import TrustedBy from "@/components/TrustedBy";
import QuickStart from "@/components/QuickStart";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />
        <HeroSection />
        <SafetyKernel />
        <ProtocolSwitcher />
        <GuardDashboard />
        <MCPToolHighlight />
        <QuickStart />
        <TrustedBy />
        <SiteFooter />
      </div>
    </div>
  );
};

export default Index;
