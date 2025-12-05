/*
  # Create Admins Table for Authentication

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `username` (text, unique) - Admin username
      - `password` (text) - Admin password (hashed in production)
      - `created_at` (timestamptz) - Record creation timestamp
      
  2. Security
    - Enable RLS on `admins` table
    - Add policy for public read access (to verify credentials)
    
  3. Initial Data
    - Insert default admin user (Wili)
*/

CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view admins for authentication"
  ON admins FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO admins (username, password) 
VALUES ('Wili', 'superwili123')
ON CONFLICT (username) DO NOTHING;
