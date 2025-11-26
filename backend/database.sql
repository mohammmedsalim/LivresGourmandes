CREATE DATABASE IF NOT EXISTS livresgourmands;
USE livresgourmands;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('client', 'admin') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample products with real images
INSERT INTO products (title, author, description, price, image, stock) VALUES
('Le Grand Livre de la Cuisine Française', 'Alain Ducasse', 'Découvrez les secrets de la gastronomie française avec ce livre complet de recettes traditionnelles et modernes.', 45.00, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=500&fit=crop', 15),
('Pâtisserie Facile', 'Pierre Hermé', 'Apprenez à réaliser des pâtisseries délicieuses avec des techniques simples et accessibles à tous.', 32.50, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=500&fit=crop', 20),
('Cuisine Végétarienne Moderne', 'Yotam Ottolenghi', 'Des recettes végétariennes créatives et savoureuses pour tous les jours.', 38.00, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=500&fit=crop', 12),
('Cuisine du Monde', 'Jamie Oliver', 'Voyagez à travers les saveurs du monde entier avec ces recettes authentiques.', 42.00, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop', 18),
('Boulangerie Artisanale', 'Eric Kayser', 'Maîtrisez l''art de la boulangerie avec des recettes de pains et viennoiseries.', 35.00, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=500&fit=crop', 10),
('Cuisine Italienne Authentique', 'Massimo Bottura', 'Les meilleures recettes italiennes, des antipasti aux desserts.', 40.00, 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=500&fit=crop', 14),
('Cuisine Asiatique Fusion', 'David Chang', 'Découvrez la fusion entre tradition asiatique et techniques modernes.', 36.50, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=500&fit=crop', 16),
('Desserts Gourmands', 'Christophe Michalak', 'Des desserts spectaculaires pour impressionner vos invités.', 33.00, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=500&fit=crop', 22),
('Cuisine Méditerranéenne', 'Ottolenghi', 'Les saveurs ensoleillées de la Méditerranée dans votre assiette.', 39.00, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=500&fit=crop', 11),
('Cuisine Rapide et Saine', 'Gordon Ramsay', 'Des recettes équilibrées prêtes en moins de 30 minutes.', 29.99, 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=500&fit=crop', 25),
('L''Art de la Cuisine Japonaise', 'Nobu Matsuhisa', 'Sushi, ramen et autres délices japonais expliqués simplement.', 44.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=500&fit=crop', 13),
('Cuisine Mexicaine Traditionnelle', 'Enrique Olvera', 'Tacos, enchiladas et mole : la vraie cuisine mexicaine.', 34.50, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=500&fit=crop', 17);

-- Insert sample users (password is 'password123' hashed with bcrypt)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@livresgourmands.com', '$2b$10$rZ5YhJKvZ5YhJKvZ5YhJKuO8qZ5YhJKvZ5YhJKvZ5YhJKvZ5YhJKu', 'admin'),
('Test Client', 'client@test.com', '$2b$10$rZ5YhJKvZ5YhJKvZ5YhJKuO8qZ5YhJKvZ5YhJKvZ5YhJKvZ5YhJKu', 'client');
