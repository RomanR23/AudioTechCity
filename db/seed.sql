CREATE TABLE tech_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE tech_products(
id SERIAL PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
product_price DECIMAL,
product_image TEXT,
product_quantity INT
);

CREATE TABLE tech_cart(
id SERIAL PRIMARY KEY,
product_id INT REFERENCES tech_products(id),
product_name VARCHAR(50) NOT NULL,
product_price DECIMAL,
product_quantity INT,
product_image TEXT,
user_id INT REFERENCES tech_users(id),
date_added TIMESTAMP
);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('SUDOTACK Studio Mic', 59.99, 'https://m.media-amazon.com/images/I/61nUtOmSMUL._AC_UL320_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Audio-Technica ATH-M20X', 49.99, 'https://cdn.shoplightspeed.com/shops/629365/files/23482241/image.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Sound BlasterX G6 Hi-Res Amp', 134.99, 'https://m.media-amazon.com/images/I/41kDoOElITL._AC_UY218_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('24 Pack 12" x 12" Studio Foam', 27.99, 'https://m.media-amazon.com/images/I/41QvIWwmjWL._AC_SX466_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Pyle Audio Mixer Sound Board', 73.99, 'https://m.media-amazon.com/images/I/81oEMcSEdEL._AC_UL320_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Monoprice Microphone Isolation Shield', 64.99, 'https://m.media-amazon.com/images/I/81dM+nbfxfS._AC_UL320_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Pioneer DJ DM-40-21W Speakers', 149.99, 'https://m.media-amazon.com/images/I/91UxCziE3PL._AC_UL320_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Numark DJ Mixer II', 125.99, 'https://m.media-amazon.com/images/I/81e2UAxI93L._AC_UL320_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('SOULWIT Cable Management-Kit', 16.99, 'https://m.media-amazon.com/images/I/71EoLMhDa8L._AC_UY218_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Roku TV Soundbar with Subwoofer', 129.99, 'https://m.media-amazon.com/images/I/71x2gvybCZL._AC_UY218_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Hercules DJControl Controller', 299.99, 'https://m.media-amazon.com/images/I/51An1nXVPlS._AC_UL320_.jpg', 0);

INSERT INTO tech_products
(product_name, product_price, product_image, product_quantity)
VALUES
('Acme Eleazar Studio Desk', 525.99, 'https://m.media-amazon.com/images/I/71Nbgy-Zu4L._AC_UL320_.jpg', 0);