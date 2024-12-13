-- Création de la base de données
CREATE DATABASE IF NOT EXISTS API_auth;
USE API_auth;
-- Création de la table des utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashedPassword VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insertion de données factices
INSERT INTO users (
        username,
        email,
        hashedPassword,
        first_name,
        last_name,
        birth_date
    )
VALUES (
        'admin',
        'jdoe@example.com',
        '$argon2id$v=19$m=16,t=2,p=1$RkMzMnhIWkRZbzZ2Qk9QSg$mVF8+iOa/Qv8qlNI/TCYMw',
        'John',
        'Doe',
        '1990-05-15'
    );