import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, Menu } from "lucide-react";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsContent from "@/components/docs/DocsContent";
import PayReferenceContent from "@/components/docs/PayReferenceContent";
import GuardSystemContent from "@/components/docs/GuardSystemContent";
import MCPIntegrationContent from "@/components/docs/MCPIntegrationContent";
import DocsTOC from "@/components/docs/DocsTOC";
import DocsFeedback from "@/components/docs/DocsFeedback";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Docs = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // CMD+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const searchItems = [
    { title: "Quickstart", url: "/docs/quickstart" },
    { title: "Core Concepts", url: "/docs/core-concepts" },
    { title: "Wallets", url: "/docs/wallets" },
    { title: "Payment Guards", url: "/docs/payment-guards" },
    { title: "MCP Integration", url: "/docs/mcp-integration" },
    { title: "API Reference: client.pay()", url: "/docs/api-reference/pay" },
    { title: "Guard System", url: "/docs/payment-guards" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
          <div className="flex items-center gap-2 sm:gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 hover:bg-accent rounded-md">
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 sm:w-80 p-0">
                <DocsSidebar />
              </SheetContent>
            </Sheet>
            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Back to Main Site</span>
            </Link>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex h-8 sm:h-9 w-full max-w-[200px] sm:max-w-sm items-center gap-1.5 sm:gap-2 rounded-md border border-border bg-background px-2 sm:px-3 text-xs sm:text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground"
          >
            <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="flex-1 text-left hidden sm:inline truncate">Search docs...</span>
            <kbd className="pointer-events-none hidden h-4 sm:h-5 select-none items-center gap-0.5 sm:gap-1 rounded border bg-muted px-1 sm:px-1.5 font-mono text-[9px] sm:text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-[10px] sm:text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </header>

      {/* Three Column Layout */}
      <div className="container mx-auto flex max-w-[1920px] 3xl:max-w-[2560px] 4xl:max-w-[3840px]">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-56 xl:w-64 2xl:w-72 3xl:w-80 border-r border-border bg-background sticky top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto">
          <DocsSidebar />
        </aside>

        {/* Center Content */}
        <main className="flex-1 min-w-0 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 py-6 sm:py-8 md:py-10 lg:py-12 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl 4xl:max-w-[90rem] mx-auto">
          {location.pathname === "/docs/api-reference/pay" ? (
            <PayReferenceContent />
          ) : location.pathname === "/docs/payment-guards" ? (
            <GuardSystemContent />
          ) : location.pathname === "/docs/mcp-integration" ? (
            <MCPIntegrationContent />
          ) : (
            <DocsContent />
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-64 2xl:w-72 3xl:w-80 border-l border-border bg-background sticky top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto px-4 xl:px-6 2xl:px-8 3xl:px-10 4xl:px-12 py-8 xl:py-10 2xl:py-12">
          <DocsTOC />
          <div className="mt-8 xl:mt-12">
            <DocsFeedback />
          </div>
        </aside>
      </div>

      {/* Command Palette */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {searchItems.map((item) => (
              <CommandItem
                key={item.url}
                onSelect={() => {
                  navigate(item.url);
                  setOpen(false);
                }}
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default Docs;
