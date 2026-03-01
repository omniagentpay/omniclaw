import { motion } from "framer-motion";
import { Award, Shield, CheckCircle2, Star, Trophy, Medal, Play, Image as ImageIcon, Loader2, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useGlobalStandardsContent, getIconComponent } from "@/hooks/useGlobalStandards";
import { GlobalStandardsContent as ContentType } from "@/types/globalStandards";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Convert database content to component format
const mapContentToItem = (content: ContentType) => {
  const Icon = getIconComponent(content.icon_name);
  return {
    id: content.id,
    type: content.type,
    title: content.title,
    issuer: content.issuer || undefined,
    year: content.year || undefined,
    icon: Icon,
    height: content.height || undefined,
    label: content.label || undefined,
    videoUrl: content.video_url || undefined,
    videoThumbnail: content.video_thumbnail || undefined,
    videoSource: content.video_source || undefined,
    imageUrl: content.image_url || undefined,
    imageAlt: content.image_alt || undefined,
    certificationBadge: content.certification_badge || undefined,
    linkUrl: content.link_url || undefined,
  };
};


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

// Media Gallery Component
const MediaGallery = ({ 
  items, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNavigate 
}: { 
  items: ReturnType<typeof mapContentToItem>[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) => {
  const currentItem = items[currentIndex];
  const hasNext = currentIndex < items.length - 1;
  const hasPrev = currentIndex > 0;

  // Get video embed URL
  const getVideoEmbedUrl = (item: ReturnType<typeof mapContentToItem>) => {
    if (!item.videoUrl) return null;
    
    if (item.videoSource === 'youtube') {
      return `https://www.youtube.com/embed/${item.videoUrl}?autoplay=1`;
    } else if (item.videoSource === 'vimeo') {
      return `https://player.vimeo.com/video/${item.videoUrl}?autoplay=1`;
    }
    
    if (item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be')) {
      const youtubeId = item.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      if (youtubeId) {
        return `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
      }
    }
    
    if (item.videoUrl.includes('vimeo.com')) {
      const vimeoId = item.videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
      if (vimeoId) {
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
      }
    }
    
    return item.videoUrl;
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrev) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNavigate(currentIndex + 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, hasNext, hasPrev, onNavigate, onClose]);

  if (!currentItem) return null;

  const hasVideo = currentItem.videoUrl || currentItem.videoThumbnail;
  const embedUrl = hasVideo ? getVideoEmbedUrl(currentItem) : null;
  const isEmbedded = embedUrl && (currentItem.videoSource === 'youtube' || currentItem.videoSource === 'vimeo' || embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com'));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background border-border [&>button]:hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Custom Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          {/* Previous Button */}
          {hasPrev && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-4 z-50 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
          )}

          {/* Next Button */}
          {hasNext && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-4 z-50 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>
          )}

          {/* Media Content */}
          <div className="w-full h-full flex flex-col items-center justify-center p-8">
            {hasVideo ? (
              <div className="w-full h-full max-w-6xl">
                {isEmbedded ? (
                  <iframe
                    src={embedUrl || undefined}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentItem.title}
                  />
                ) : (
                  <video
                    src={embedUrl || currentItem.videoUrl || undefined}
                    className="w-full h-full rounded-lg"
                    controls
                    autoPlay
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ) : currentItem.imageUrl ? (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.imageAlt || currentItem.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
            ) : null}

            {/* Info Panel */}
            <div className="mt-6 w-full max-w-6xl text-center">
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                {currentItem.title}
              </h3>
              {currentItem.issuer && (
                <p className="text-sm text-muted-foreground mb-2">{currentItem.issuer}</p>
              )}
              {currentItem.label && (
                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-md border border-primary/20 mb-2">
                  {currentItem.label}
                </span>
              )}
              {currentItem.year && (
                <p className="text-xs font-mono text-muted-foreground">{currentItem.year}</p>
              )}
            </div>

            {/* Navigation Dots */}
            {items.length > 1 && (
              <div className="mt-4 flex gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ContentCard = ({ 
  item, 
  index, 
  onOpenGallery 
}: { 
  item: ReturnType<typeof mapContentToItem>; 
  index: number;
  onOpenGallery: (index: number) => void;
}) => {
  const Icon = item.icon;
  const hasVideo = item.videoUrl || item.videoThumbnail;
  const hasImage = item.imageUrl;
  const hasMedia = hasVideo || hasImage;

  return (
    <motion.div
      variants={itemVariants}
      className={`${item.height || 'h-auto'} relative overflow-hidden rounded-lg border border-border bg-card group hover:border-primary/50 transition-colors flex flex-col`}
    >
      <div className="relative h-full p-6 flex flex-col flex-1">
        {/* Header - Icon Only */}
        {Icon && (
          <div className="mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        )}

        {/* Media Preview in Card Body */}
        {hasMedia && (
          <div 
            className="relative w-full mb-4 rounded-lg overflow-hidden border border-border/50 cursor-pointer group/media"
            onClick={() => hasMedia && onOpenGallery(index)}
          >
            {item.videoThumbnail ? (
              <>
                <img
                  src={item.videoThumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    console.error('Failed to load video thumbnail:', item.videoThumbnail);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover/media:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm border-2 border-primary/50 flex items-center justify-center group-hover/media:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-primary ml-0.5" />
                  </div>
                </div>
              </>
            ) : item.imageUrl ? (
              <>
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    console.error('Failed to load image:', item.imageUrl);
                    console.error('Item details:', { id: item.id, type: item.type, title: item.title });
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', item.imageUrl);
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover/media:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-opacity">
                  <div className="h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm border-2 border-primary/50 flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 flex flex-col justify-end">
          {/* Title with Label Badge */}
          <div className="mb-2">
            <h3 className="font-display font-semibold text-base text-foreground mb-2">
              {item.title}
            </h3>
            {item.label && (
              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20 mb-2">
                {item.label}
              </span>
            )}
          </div>
          
          {item.issuer && (
            <p className="text-sm text-muted-foreground mb-3">{item.issuer}</p>
          )}
          
          {/* Footer - Year, Certification Badge, and Link */}
          <div className="mt-auto pt-3 border-t border-border/50">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 flex-1">
                {item.year && (
                  <span className="text-xs font-mono text-muted-foreground">{item.year}</span>
                )}
                {item.linkUrl && (
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    <span className="font-medium">View Submission</span>
                    <ExternalLink className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
              {item.certificationBadge && (
                <p className="text-xs font-mono text-primary text-right">{item.certificationBadge}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const GlobalStandards = () => {
  // Fetch content from Supabase
  const { data: contentItems = [], isLoading: isLoadingContent, error: contentError } = useGlobalStandardsContent();

  // Map database content to component format
  const mappedContent = contentItems.map(mapContentToItem);

  // Filter items that have media (video or image) for gallery
  const mediaItems = mappedContent.filter(item => item.videoUrl || item.videoThumbnail || item.imageUrl);
  
  // Create a map from original index to media index
  const originalToMediaIndex = new Map<number, number>();
  let mediaIdx = 0;
  mappedContent.forEach((item, idx) => {
    if (item.videoUrl || item.videoThumbnail || item.imageUrl) {
      originalToMediaIndex.set(idx, mediaIdx);
      mediaIdx++;
    }
  });

  // Gallery state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Handle opening gallery from card
  const handleOpenGallery = (cardIndex: number) => {
    const mediaIndex = originalToMediaIndex.get(cardIndex);
    if (mediaIndex !== undefined) {
      setGalleryIndex(mediaIndex);
      setGalleryOpen(true);
    }
  };

  // Handle gallery navigation
  const handleGalleryNavigate = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < mediaItems.length) {
      setGalleryIndex(newIndex);
    }
  };

  // Show loading state
  if (isLoadingContent) {
    return (
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 border-t border-glass-border">
        <div className="container mx-auto max-w-7xl xl:max-w-[90rem] 2xl:max-w-[100rem] 3xl:max-w-[120rem]">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  // Show error state (but still render with fallback data)
  if (contentError) {
    console.error('Error loading global standards content:', contentError);
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 border-t border-glass-border">
      <div className="container mx-auto max-w-7xl xl:max-w-[90rem] 2xl:max-w-[100rem] 3xl:max-w-[120rem]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">
            Global Recognition
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-foreground tracking-tight mb-3 sm:mb-4">
            Elite Certification
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl xl:max-w-3xl mx-auto">
            Recognized by industry leaders and trusted by developers worldwide.
          </p>
        </motion.div>

        {/* Content Grid - Awards, Certifications, Recognitions, Videos, Images */}
        {mappedContent.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-16 sm:mb-20 md:mb-24 lg:mb-32"
          >
            {mappedContent.map((item, index) => (
              <ContentCard 
                key={item.id} 
                item={item} 
                index={index}
                onOpenGallery={handleOpenGallery}
              />
            ))}
          </motion.div>
        )}

        {/* Media Gallery Modal */}
        {mediaItems.length > 0 && (
          <MediaGallery
            items={mediaItems}
            currentIndex={galleryIndex}
            isOpen={galleryOpen}
            onClose={() => setGalleryOpen(false)}
            onNavigate={handleGalleryNavigate}
          />
        )}

      </div>
    </section>
  );
};

export default GlobalStandards;
