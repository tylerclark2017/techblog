-- Drop the database if it exists
DROP DATABASE IF EXISTS blog_db;

-- Create the database
CREATE DATABASE blog_db;

-- Use the database
USE blog_db;

-- Create a users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Create a passwords table
CREATE TABLE passwords (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);