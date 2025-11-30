-- Contact form submissions table
-- Run this SQL on your PostgreSQL database to create the table

CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    message TEXT NOT NULL,
    service_interest VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on email for faster lookups
CREATE INDEX idx_contact_email ON contact_submissions(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at DESC);
