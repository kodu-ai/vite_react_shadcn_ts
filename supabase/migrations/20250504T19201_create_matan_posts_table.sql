-- Create the matan_posts table
CREATE TABLE matan_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  content TEXT
);

-- Add comments for clarity
COMMENT ON TABLE matan_posts IS 'Stores posts created by Matan.';
COMMENT ON COLUMN matan_posts.title IS 'The title of the post.';
COMMENT ON COLUMN matan_posts.content IS 'The main content of the post.';

-- Optional: Enable Row Level Security (RLS) if needed
-- ALTER TABLE matan_posts ENABLE ROW LEVEL SECURITY;

-- Example Policies (adjust based on actual auth requirements):
-- CREATE POLICY "Allow public read access" ON matan_posts FOR SELECT USING (true);
-- CREATE POLICY "Allow authenticated users to manage their own posts" ON matan_posts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id); -- Assumes a user_id column linked to auth.users
-- CREATE POLICY "Allow admin full access" ON matan_posts FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'));
