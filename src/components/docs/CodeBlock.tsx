import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock = ({ code, language, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // VS Code Dark+ theme colors
  const getTokenColor = (text: string, lang: string): string => {
    if (lang === "bash" || lang === "shell" || lang === "sh") {
      // Shell syntax highlighting
      if (text.trim().startsWith("#")) return "text-[#6A9955]"; // Comments - green
      if (/^(pip|uv|npm|yarn|curl|wget|git|export|export|source|\.\/)/.test(text.trim())) return "text-[#4EC9B0]"; // Commands - cyan
      if (/^[A-Z_][A-Z0-9_]*=/.test(text.trim())) return "text-[#9CDCFE]"; // Variables - light blue
      if (/^["'`]/.test(text)) return "text-[#CE9178]"; // Strings - orange
      if (/^\d+/.test(text)) return "text-[#B5CEA8]"; // Numbers - light green
      return "text-[#D4D4D4]"; // Default - light gray
    }

    if (lang === "python") {
      if (text.startsWith("#") || text.startsWith("//")) return "text-[#6A9955]"; // Comments
      if (/^["'`]/.test(text)) return "text-[#CE9178]"; // Strings
      if (/^\d/.test(text)) return "text-[#B5CEA8]"; // Numbers
      if (["await", "async", "import", "from", "def", "class", "return", "if", "else", "elif", "for", "while", "try", "except", "with", "as"].includes(text.trim())) return "text-[#C586C0]"; // Keywords - purple
      if (["True", "False", "None"].includes(text.trim())) return "text-[#569CD6]"; // Built-ins - blue
      if (/^[A-Z_][A-Z0-9_]*$/.test(text.trim())) return "text-[#4EC9B0]"; // Constants - cyan
      return "text-[#D4D4D4]"; // Default
    }

    // Default VS Code colors
    if (text.startsWith("#") || text.startsWith("//")) return "text-[#6A9955]";
    if (/^["'`]/.test(text)) return "text-[#CE9178]";
    if (/^\d/.test(text)) return "text-[#B5CEA8]";
    return "text-[#D4D4D4]";
  };

  const highlightCode = (code: string, lang: string = ""): JSX.Element[] => {
    if (!lang || lang === "text") {
      return [<span key="0" className="text-[#D4D4D4]">{code}</span>];
    }

    const lines = code.split("\n");
    return lines.map((line, lineIdx) => {
      if (lang === "bash" || lang === "shell" || lang === "sh") {
        // Enhanced shell highlighting
        const tokens: Array<{ text: string; color: string }> = [];
        let remaining = line;
        
        // Match comments
        if (remaining.trim().startsWith("#")) {
          tokens.push({ text: remaining, color: "text-[#6A9955]" });
        } else {
          // Split by spaces but preserve them
          const parts = line.split(/(\s+)/);
          parts.forEach((part) => {
            if (!part) return;
            const trimmed = part.trim();
            if (!trimmed) {
              tokens.push({ text: part, color: "text-[#D4D4D4]" });
            } else if (/^(pip|uv|npm|yarn|curl|wget|git|export|source|\.\/|python|python3|uvx|add|install)$/i.test(trimmed)) {
              tokens.push({ text: part, color: "text-[#4EC9B0]" }); // Commands
            } else if (/^[A-Z_][A-Z0-9_]*=/.test(trimmed)) {
              tokens.push({ text: part, color: "text-[#9CDCFE]" }); // Variables
            } else if (/^["'`]/.test(trimmed)) {
              tokens.push({ text: part, color: "text-[#CE9178]" }); // Strings
            } else {
              tokens.push({ text: part, color: "text-[#D4D4D4]" }); // Default
            }
          });
        }
        
        return (
          <span key={lineIdx}>
            {tokens.length > 0 ? (
              tokens.map((token, tokenIdx) => (
                <span key={tokenIdx} className={token.color}>
                  {token.text}
                </span>
              ))
            ) : (
              <span className="text-[#D4D4D4]">{line}</span>
            )}
            {lineIdx < lines.length - 1 && "\n"}
          </span>
        );
      }

      // For other languages, simple word-based highlighting
      const words = line.split(/(\s+|[(){}[\].,;:])/);
      return (
        <span key={lineIdx}>
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className={getTokenColor(word, lang)}>
              {word}
            </span>
          ))}
          {lineIdx < lines.length - 1 && "\n"}
        </span>
      );
    });
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="bg-[#1e1e1e] border border-border/20 rounded-lg overflow-hidden shadow-lg">
        {/* VS Code-style header bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 bg-[#252526] border-b border-border/20">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27c93f]" />
            </div>
            {language && (
              <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs text-muted-foreground font-mono uppercase">
                {language}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 sm:h-7 px-1.5 sm:px-2 text-[10px] sm:text-xs hover:bg-[#2d2d30]"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5 text-[#4EC9B0]" />
                <span className="text-[#4EC9B0] hidden xs:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5" />
                <span className="hidden xs:inline">Copy</span>
              </>
            )}
          </Button>
        </div>
        
        {/* Code content */}
        <div className="p-3 sm:p-4 md:p-5 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed m-0">
            <code className="block">
              {highlightCode(code, language || "")}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
