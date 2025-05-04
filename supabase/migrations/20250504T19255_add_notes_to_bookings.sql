-- Add a notes column to the bookings table
ALTER TABLE bookings
ADD COLUMN notes TEXT;

-- Add a comment to the new column
COMMENT ON COLUMN bookings.notes IS 'Optional notes about the booking or customer preferences.';
