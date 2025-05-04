-- Create the services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  service_code TEXT NOT NULL UNIQUE, -- e.g., 'classic_cut', used as identifier
  name TEXT NOT NULL, -- e.g., 'Classic Haircut'
  description TEXT,
  price NUMERIC(10, 2) NOT NULL, -- Store price precisely
  duration_minutes INT -- Optional duration in minutes
);

-- Add comments for clarity
COMMENT ON TABLE services IS 'Stores details about barbershop services.';
COMMENT ON COLUMN services.service_code IS 'Unique code identifier for the service.';
COMMENT ON COLUMN services.name IS 'Display name of the service.';
COMMENT ON COLUMN services.description IS 'Brief description of the service.';
COMMENT ON COLUMN services.price IS 'Price of the service.';
COMMENT ON COLUMN services.duration_minutes IS 'Estimated duration of the service in minutes.';

-- Seed initial services
INSERT INTO services (service_code, name, description, price, duration_minutes) VALUES
  ('classic_cut', 'Classic Haircut', 'Timeless style, precision cut.', 35.00, 30),
  ('modern_fade', 'Modern Fade', 'Sharp fade tailored to you.', 40.00, 45),
  ('beard_trim', 'Beard Trim & Shape', 'Keep your beard looking its best.', 25.00, 20),
  ('hot_shave', 'Hot Towel Shave', 'Relaxing traditional shave experience.', 45.00, 40);

-- Optional: Enable RLS if needed, similar to the bookings table
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Example Policies:
-- Allow public read access so the booking form can fetch services
-- CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);

-- Allow admins to manage services
-- CREATE POLICY "Allow admin full access" ON services FOR ALL USING (
--   EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
-- );
