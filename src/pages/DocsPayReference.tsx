import { useState } from "react";
import { useLocation } from "react-router-dom";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsTOC from "@/components/docs/DocsTOC";
import DocsFeedback from "@/components/docs/DocsFeedback";
import PayReferenceContent from "@/components/docs/PayReferenceContent";

const DocsPayReference = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Three Column Layout */}
      <div className="container mx-auto flex">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-border bg-background sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <DocsSidebar />
        </aside>

        {/* Center Content */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          <PayReferenceContent />
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-64 border-l border-border bg-background sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-6 py-12">
          <DocsTOC />
          <div className="mt-12">
            <DocsFeedback />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DocsPayReference;
