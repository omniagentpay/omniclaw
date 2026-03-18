import Navbar from "@/components/Navbar";
import ProtocolSwitcher from "@/components/ProtocolSwitcher";
import GuardDashboard from "@/components/GuardDashboard";
import MCPToolHighlight from "@/components/MCPToolHighlight";
import SafetyKernel from "@/components/SafetyKernel";
import VerticalStream from "@/components/VerticalStream";
import QuickStart from "@/components/QuickStart";
import InfraFeatures from "@/components/InfraFeatures";
import SiteFooter from "@/components/SiteFooter";
import MeshBackground from "@/components/MeshBackground";
import SideNavigation from "@/components/SideNavigation";

const Developer = () => {
  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />
        <SideNavigation />
        
        <div className="pt-32 pb-16 px-6 md:px-12 lg:px-20 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground tracking-tight mb-6">
            Developer Resources
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Deep dive into the technical architecture of OmniClaw. Explore the infrastructure, safety kernel, and integration tools.
          </p>
        </div>

        <section id="infrastructure">
          <InfraFeatures />
        </section>
        <section id="protocol">
          <ProtocolSwitcher />
        </section>
        <section id="safety">
          <SafetyKernel />
        </section>
        <section id="dashboard">
          <GuardDashboard />
        </section>
        <section id="mcp">
          <MCPToolHighlight />
        </section>
        <section id="quickstart">
          <QuickStart />
        </section>
        {/* <VerticalStream /> */}
        
        <SiteFooter />
      </div>
    </div>
  );
};

export default Developer;
