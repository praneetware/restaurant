CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

CREATE TABLE IF NOT EXISTS inventory (
  ingredient VARCHAR(50) PRIMARY KEY,
  quantity INT
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100),
  contact VARCHAR(50),
  table_no VARCHAR(10),
  items TEXT
);

INSERT INTO inventory (ingredient, quantity) VALUES
('Potatoes', 20), ('Oil', 50), ('Paneer', 30), ('Cabbage', 15),
('Chicken', 25), ('Spinach', 20), ('Lentils', 25), ('Rice', 40),
('Spices', 30), ('Cream', 20), ('Flour', 35), ('Milk', 30),
('Sugar', 25), ('Tomatoes', 18), ('Gulab Syrup', 10),
('Butter', 20), ('Vegetables', 15), ('Flavors', 10), ('Cheese', 15);
