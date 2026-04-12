import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const VideoPresentation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Replace with your actual video URL (YouTube, Vimeo, or direct video file)
  const videoId = "KSbIxx9_8gw"; // YouTube video ID or Vimeo ID
  const videoSource = "youtube"; // "youtube" | "vimeo" | "direct"

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoSource === "youtube") {
      setVideoUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
    } else if (videoSource === "vimeo") {
      setVideoUrl(`https://player.vimeo.com/video/${videoId}?autoplay=1`);
    }
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 border-t border-glass-border">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[100rem]">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">
              Product Demo
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-foreground tracking-tight mb-3 sm:mb-4">
              See OmniClaw in Action
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl xl:max-w-2xl mx-auto">
              Watch how OmniClaw enables autonomous AI agents to execute payments safely and instantly across any blockchain.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative max-w-5xl mx-auto">
            {/* Video Container */}
            <div className="relative aspect-video rounded-xl overflow-hidden glass-card border border-glass-border shadow-2xl">
              {!isPlaying ? (
                // Video Thumbnail/Placeholder
                <div className="relative w-full h-full bg-gradient-to-br from-background via-background/95 to-background/90 flex items-center justify-center group cursor-pointer" onClick={handlePlay}>
                  {/* Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "linear-gradient(hsl(75 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(75 100% 50% / 0.3) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Play Button */}
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10"
                  >
                    <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary/50 flex items-center justify-center group-hover:bg-primary/30 group-hover:border-primary transition-all duration-300">
                      <Play className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-primary ml-1 fill-primary/20" />
                    </div>
                  </motion.div>

                  {/* Overlay Text */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="glass-card p-4 sm:p-5 md:p-6 rounded-lg border border-glass-border">
                      <h3 className="font-display font-semibold text-base sm:text-lg md:text-xl text-foreground mb-2">
                        OmniClaw Product Demo
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Click to watch the full presentation
                      </p>
                    </div>
                  </div>

                  {/* Animated Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                // Video Player
                <div className="w-full h-full">
                  {videoSource === "youtube" || videoSource === "vimeo" ? (
                    <iframe
                      src={videoUrl || undefined}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="OmniClaw Product Demo"
                    />
                  ) : (
                    <video
                      src={videoUrl || undefined}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </div>

            {/* Video Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
              <ScrollReveal delay={0.2}>
                <div className="glass-card p-4 sm:p-5 rounded-lg border border-glass-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Play className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-display font-semibold text-sm sm:text-base text-foreground">
                      Quick Start
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Get up and running in under 5 minutes
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="glass-card p-4 sm:p-5 rounded-lg border border-glass-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-display font-semibold text-sm sm:text-base text-foreground">
                      Live Demo
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    See real payments in action
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="glass-card p-4 sm:p-5 rounded-lg border border-glass-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Play className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-display font-semibold text-sm sm:text-base text-foreground">
                      Full Walkthrough
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Complete feature overview
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VideoPresentation;
