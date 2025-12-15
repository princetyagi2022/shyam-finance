-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS shyam_fin_db;
USE shyam_fin_db;

-- ==========================================
-- 2. Users Table
-- Stores login info, profile details, and role (user/admin)
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 3. Loan Applications Table
-- Stores the loan details linked to a specific user
-- ==========================================
CREATE TABLE IF NOT EXISTS loan_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    loan_amount DECIMAL(10, 2) NOT NULL,
    loan_type VARCHAR(50) DEFAULT 'Personal Loan',
    tenure_months INT DEFAULT 12,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key: Links to 'users' table
    -- ON DELETE CASCADE: If a user is deleted, delete their loans too
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================
-- 4. Notifications Table
-- Stores messages for the user (e.g., "EMI Pending")
-- ==========================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================
-- 5. Seed Data (Optional)
-- Create a default Admin user to get started
-- ==========================================

-- NOTE: The password below is a HASH for 'admin123'. 
-- In a real app, you should register via the UI, but this helps for testing.
INSERT INTO users (username, email, phone, password, role) 
VALUES 
('Admin User', 'admin@shyamfin.com', '9999999999', '$2a$10$CwTycUXWue0Thq9StjUM0u.C2g4yQx.j0Y/k.K9/Y.g/Y.g/Y.g', 'admin');