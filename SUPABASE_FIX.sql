-- Quick fix for rows with null type
-- Run this SQL in your Supabase SQL Editor

-- First, check which rows have null type:
SELECT id, title, type FROM global_standards_content WHERE type IS NULL;

-- Then update them based on their content:
-- For awards/recognitions:
UPDATE global_standards_content 
SET type = 'award' 
WHERE type IS NULL 
  AND (label IS NOT NULL OR issuer IS NOT NULL);

-- For videos:
UPDATE global_standards_content 
SET type = 'video' 
WHERE type IS NULL 
  AND video_url IS NOT NULL;

-- For images:
UPDATE global_standards_content 
SET type = 'image' 
WHERE type IS NULL 
  AND image_url IS NOT NULL;

-- For certifications:
UPDATE global_standards_content 
SET type = 'certification' 
WHERE type IS NULL 
  AND certification_badge IS NOT NULL;

-- If you need to manually set a specific row:
-- UPDATE global_standards_content 
-- SET type = 'award'  -- Change to appropriate type
-- WHERE id = 5;  -- Change to your row ID
