import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { GlobalStandardsContent, CertificationOrbit } from '@/types/globalStandards';
import * as LucideIcons from 'lucide-react';

// Icon mapping for Lucide icons
const iconMap: Record<string, any> = {
  Shield: LucideIcons.Shield,
  Award: LucideIcons.Award,
  Star: LucideIcons.Star,
  Trophy: LucideIcons.Trophy,
  Medal: LucideIcons.Medal,
  CheckCircle2: LucideIcons.CheckCircle2,
  Play: LucideIcons.Play,
  Image: LucideIcons.Image,
};

export const useGlobalStandardsContent = () => {
  return useQuery({
    queryKey: ['globalStandardsContent'],
    queryFn: async () => {
      // Check if Supabase is configured
      if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
        console.warn('Supabase not configured. Returning empty array.');
        return [] as GlobalStandardsContent[];
      }

      const { data, error } = await supabase
        .from('global_standards_content')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching global standards content:', error);
        // Return empty array on error instead of throwing
        return [] as GlobalStandardsContent[];
      }

      return (data || []) as GlobalStandardsContent[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1, // Only retry once
  });
};

export const useCertificationOrbit = () => {
  return useQuery({
    queryKey: ['certificationOrbit'],
    queryFn: async () => {
      // Check if Supabase is configured
      if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
        console.warn('Supabase not configured. Returning default certifications.');
        return defaultCertifications as CertificationOrbit[];
      }

      const { data, error } = await supabase
        .from('certification_orbit')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching certification orbit:', error);
        // Return default certifications on error
        return defaultCertifications as CertificationOrbit[];
      }

      return (data || defaultCertifications) as CertificationOrbit[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1, // Only retry once
  });
};

// Default certifications fallback
const defaultCertifications = [
  { id: 1, name: "SOC 2", angle: 0, display_order: 1, is_active: true },
  { id: 2, name: "ISO 27001", angle: 45, display_order: 2, is_active: true },
  { id: 3, name: "GDPR", angle: 90, display_order: 3, is_active: true },
  { id: 4, name: "HIPAA", angle: 135, display_order: 4, is_active: true },
  { id: 5, name: "PCI DSS", angle: 180, display_order: 5, is_active: true },
  { id: 6, name: "CCPA", angle: 225, display_order: 6, is_active: true },
  { id: 7, name: "NIST", angle: 270, display_order: 7, is_active: true },
  { id: 8, name: "FIDO2", angle: 315, display_order: 8, is_active: true },
];

// Helper to get icon component from icon name
export const getIconComponent = (iconName: string | null | undefined) => {
  if (!iconName) return null;
  return iconMap[iconName] || null;
};
