import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DocsTOC = () => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h1, h2, h3");
    const headingData = Array.from(headingElements).map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: el.textContent || "",
      level: parseInt(el.tagName.charAt(1)),
    }));

    setHeadings(headingData);

    // Add IDs to headings
    headingElements.forEach((el, index) => {
      if (!el.id) {
        el.id = headingData[index].id;
      }
    });

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold mb-4 text-foreground">On this page</h3>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "block text-sm transition-colors",
              heading.level === 1 && "font-semibold",
              heading.level === 2 && "pl-0",
              heading.level === 3 && "pl-4 text-muted-foreground",
              activeId === heading.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default DocsTOC;
