// Database types for GlobalStandards content
export type ContentType = 'award' | 'certification' | 'recognition' | 'video' | 'image';

export interface GlobalStandardsContent {
  id: number;
  type: ContentType;
  title: string;
  issuer?: string | null;
  year?: string | null;
  label?: string | null; // e.g., "1st Place", "Gold", "Best in Class"
  icon_name?: string | null; // Lucide icon name
  height?: string | null; // Tailwind height class
  // For videos
  video_url?: string | null;
  video_thumbnail?: string | null;
  video_source?: 'youtube' | 'vimeo' | 'direct' | null;
  // For images
  image_url?: string | null;
  image_alt?: string | null;
  // For certifications
  certification_badge?: string | null;
  // Link to external page (e.g., hackathon submission page)
  link_url?: string | null;
  // Metadata
  display_order?: number | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CertificationOrbit {
  id: number;
  name: string;
  angle: number; // 0-360 degrees
  display_order?: number | null;
  is_active?: boolean | null;
}
