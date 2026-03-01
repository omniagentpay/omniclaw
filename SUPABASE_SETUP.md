# Supabase Setup for GlobalStandards Section

This guide will help you set up Supabase tables for the GlobalStandards section.

## Prerequisites

1. Create a Supabase project at https://supabase.com
2. Get your project URL and anon key from Settings > API

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema

Run these SQL commands in your Supabase SQL Editor:

### 1. Create `global_standards_content` table

```sql
CREATE TABLE IF NOT EXISTS global_standards_content (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('award', 'certification', 'recognition', 'video', 'image')),
  title TEXT NOT NULL,
  issuer TEXT,
  year TEXT,
  label TEXT, -- e.g., "1st Place", "Gold", "Best in Class"
  icon_name TEXT, -- Lucide icon name (e.g., "Shield", "Award", "Star", "Trophy", "Medal", "CheckCircle2", "Play", "Image")
  height TEXT, -- Tailwind height class (e.g., "h-48", "h-64")
  -- Video fields
  video_url TEXT,
  video_thumbnail TEXT,
  video_source TEXT CHECK (video_source IN ('youtube', 'vimeo', 'direct')),
  -- Image fields
  image_url TEXT,
  image_alt TEXT,
  -- Certification fields
  certification_badge TEXT,
  -- Link to external page (e.g., hackathon submission page)
  link_url TEXT,
  -- Metadata
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add a comment to clarify the type field requirement
COMMENT ON COLUMN global_standards_content.type IS 'REQUIRED: Must be one of: award, certification, recognition, video, image';

-- Create index for performance
CREATE INDEX idx_global_standards_content_active ON global_standards_content(is_active, display_order);

-- Enable Row Level Security (optional, adjust as needed)
ALTER TABLE global_standards_content ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access
CREATE POLICY "Allow public read access" ON global_standards_content
  FOR SELECT USING (is_active = true);
```

### 2. Create `certification_orbit` table

```sql
CREATE TABLE IF NOT EXISTS certification_orbit (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  angle INTEGER NOT NULL CHECK (angle >= 0 AND angle < 360), -- 0-359 degrees
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX idx_certification_orbit_active ON certification_orbit(is_active, display_order);

-- Enable Row Level Security (optional, adjust as needed)
ALTER TABLE certification_orbit ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access
CREATE POLICY "Allow public read access" ON certification_orbit
  FOR SELECT USING (is_active = true);
```

### 3. Create updated_at trigger function (optional but recommended)

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to global_standards_content
CREATE TRIGGER update_global_standards_content_updated_at
  BEFORE UPDATE ON global_standards_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to certification_orbit
CREATE TRIGGER update_certification_orbit_updated_at
  BEFORE UPDATE ON certification_orbit
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Sample Data

### Insert sample content items:

**IMPORTANT: The `type` field is REQUIRED and must be one of: 'award', 'certification', 'recognition', 'video', 'image'**

```sql
-- Award example with link (REQUIRED: type must be specified)
INSERT INTO global_standards_content (type, title, issuer, year, label, icon_name, height, link_url, display_order)
VALUES ('award', 'Security Excellence', 'Blockchain Security Alliance', '2024', '1st Place', 'Shield', 'h-48', 'https://example.com/submission', 1);

-- Recognition example
INSERT INTO global_standards_content (type, title, issuer, year, label, icon_name, height, display_order)
VALUES ('recognition', 'Best Infrastructure', 'Ethereum Foundation', '2024', 'Top Choice', 'Trophy', 'h-56', 2);

-- Video example
INSERT INTO global_standards_content (type, title, video_url, video_source, video_thumbnail, height, display_order)
VALUES ('video', 'Product Demo', 'YOUR_VIDEO_ID', 'youtube', '/path/to/thumbnail.jpg', 'h-64', 3);

-- Image example
INSERT INTO global_standards_content (type, title, image_url, image_alt, issuer, height, display_order)
VALUES ('image', 'Partnership', '/path/to/image.jpg', 'Partnership with major company', 'Company Name', 'h-48', 4);

-- Certification example
INSERT INTO global_standards_content (type, title, issuer, year, icon_name, certification_badge, height, display_order)
VALUES ('certification', 'Audit Certified', 'Trail of Bits', '2024', 'CheckCircle2', 'SOC 2 Type II', 'h-60', 5);

-- Fix for your existing row (update the null type)
-- Replace 5 with your actual row ID
UPDATE global_standards_content 
SET type = 'award' 
WHERE id = 5 AND type IS NULL;
```

### Insert sample certification orbit items:

```sql
INSERT INTO certification_orbit (name, angle, display_order) VALUES
  ('SOC 2', 0, 1),
  ('ISO 27001', 45, 2),
  ('GDPR', 90, 3),
  ('HIPAA', 135, 4),
  ('PCI DSS', 180, 5),
  ('CCPA', 225, 6),
  ('NIST', 270, 7),
  ('FIDO2', 315, 8);
```

## Available Lucide Icons

You can use any of these icon names in the `icon_name` field:
- `Shield`
- `Award`
- `Star`
- `Trophy`
- `Medal`
- `CheckCircle2`
- `Play`
- `Image`

## Managing Content

### Add a new award:
```sql
-- IMPORTANT: Always include the 'type' field!
INSERT INTO global_standards_content (type, title, issuer, year, label, icon_name, height, display_order, is_active)
VALUES ('award', 'Your Award Title', 'Issuer Name', '2024', '1st Place', 'Award', 'h-48', 10, true);
```

### Fix rows with missing type:
```sql
-- If you have existing rows with null type, update them:
UPDATE global_standards_content 
SET type = 'award'  -- or 'certification', 'recognition', 'video', 'image'
WHERE type IS NULL;

-- Or update a specific row:
UPDATE global_standards_content 
SET type = 'award' 
WHERE id = YOUR_ROW_ID AND type IS NULL;
```

### Update content:
```sql
UPDATE global_standards_content
SET title = 'Updated Title', label = 'Gold'
WHERE id = 1;
```

### Deactivate content (soft delete):
```sql
UPDATE global_standards_content
SET is_active = false
WHERE id = 1;
```

### Reorder content:
```sql
UPDATE global_standards_content
SET display_order = 1
WHERE id = 1;
```

## Migration: Adding link_url Column

If you have an existing `global_standards_content` table and want to add the `link_url` column:

```sql
-- Add link_url column to existing table
ALTER TABLE global_standards_content
ADD COLUMN IF NOT EXISTS link_url TEXT;

-- Add a comment to document the column
COMMENT ON COLUMN global_standards_content.link_url IS 'Link to external page (e.g., hackathon submission page)';
```

## Notes

- The component will automatically fetch and display active content ordered by `display_order`
- Set `is_active = false` to hide content without deleting it
- Use `display_order` to control the order items appear in the grid
- For videos, use the video ID (not full URL) for YouTube/Vimeo
- Image URLs can be Supabase Storage URLs or external URLs
- Use `link_url` to add links to external pages (e.g., hackathon submission pages)
- The certification orbit uses angles in degrees (0-359) to position badges around the circle
