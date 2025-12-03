-- Add form_type column to distinguish between quote and contact forms
ALTER TABLE public.form_submissions 
ADD COLUMN form_type text NOT NULL DEFAULT 'quote';

-- Add subject column for contact forms
ALTER TABLE public.form_submissions 
ADD COLUMN subject text;

-- Make moving-specific fields nullable for contact forms
ALTER TABLE public.form_submissions ALTER COLUMN moving_from DROP NOT NULL;
ALTER TABLE public.form_submissions ALTER COLUMN moving_to DROP NOT NULL;
ALTER TABLE public.form_submissions ALTER COLUMN moving_date DROP NOT NULL;
ALTER TABLE public.form_submissions ALTER COLUMN moving_time DROP NOT NULL;
ALTER TABLE public.form_submissions ALTER COLUMN move_size DROP NOT NULL;