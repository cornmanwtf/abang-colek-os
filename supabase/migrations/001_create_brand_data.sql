-- Migration: Create brand_data table for Abang Colek Brand OS
-- Run this in Supabase SQL Editor
-- Drop table if exists (for development only)
-- DROP TABLE IF EXISTS brand_data;
-- Create the brand_data table
CREATE TABLE IF NOT EXISTS brand_data (
    id SERIAL PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL DEFAULT 'default_user',
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Create index for faster user lookup
CREATE INDEX IF NOT EXISTS idx_brand_data_user_id ON brand_data (user_id);
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ language 'plpgsql';
-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_brand_data_updated_at ON brand_data;
CREATE TRIGGER update_brand_data_updated_at BEFORE
UPDATE ON brand_data FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Enable Row Level Security (RLS)
ALTER TABLE brand_data ENABLE ROW LEVEL SECURITY;
-- Policy: Allow all operations for now (single-user app)
-- For multi-user, replace with auth.uid() based policies
CREATE POLICY "Allow all operations for default user" ON brand_data FOR ALL USING (true) WITH CHECK (true);
-- Grant access to anon and authenticated users
GRANT ALL ON brand_data TO anon;
GRANT ALL ON brand_data TO authenticated;
GRANT USAGE,
    SELECT ON SEQUENCE brand_data_id_seq TO anon;
GRANT USAGE,
    SELECT ON SEQUENCE brand_data_id_seq TO authenticated;
-- Comment for documentation
COMMENT ON TABLE brand_data IS 'Stores brand OS data as JSON for each user';
COMMENT ON COLUMN brand_data.user_id IS 'Unique identifier for user (default_user for single-user mode)';
COMMENT ON COLUMN brand_data.data IS 'Full BrandOSData JSON object';