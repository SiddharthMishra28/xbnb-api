INSERT INTO users (username, email, password_hash, full_name, phone_number, profile_picture_url) 
VALUES 
('john_doe', 'john@example.com', 'hashed_password_1', 'John Doe', '+1234567890', 'https://example.com/profile_pic_1.jpg'),
('alice_smith', 'alice@example.com', 'hashed_password_2', 'Alice Smith', '+9876543210', 'https://example.com/profile_pic_2.jpg'),
('bob_jones', 'bob@example.com', 'hashed_password_3', 'Bob Jones', '+1122334455', 'https://example.com/profile_pic_3.jpg'),
('emily_wilson', 'emily@example.com', 'hashed_password_4', 'Emily Wilson', '+9988776655', 'https://example.com/profile_pic_4.jpg');

INSERT INTO listings (title, description, price, currency, city, country, address, latitude, longitude, host_id) 
VALUES 
('Cozy Apartment in City Center', 'Beautiful apartment with a view of the city skyline', 100.00, 'USD', 'New York City', 'USA', '123 Main St', 40.7128, -74.0060, 1),
('Beach House with Ocean View', 'Spacious beach house just steps away from the ocean', 150.00, 'USD', 'Los Angeles', 'USA', '456 Beach Blvd', 34.0522, -118.2437, 2),
('Mountain Cabin Retreat', 'Rustic cabin nestled in the mountains for a peaceful getaway', 120.00, 'USD', 'Denver', 'USA', '789 Mountain Rd', 39.7392, -104.9903, 3),
('City Loft in Historic Building', 'Chic loft apartment in a renovated historic building', 200.00, 'USD', 'Chicago', 'USA', '101 Loft Ave', 41.8781, -87.6298, 4);

INSERT INTO listing_images (listing_id, image_url) 
VALUES 
(1, 'https://example.com/listing_image_1.jpg'),
(2, 'https://example.com/listing_image_2.jpg'),
(3, 'https://example.com/listing_image_3.jpg'),
(4, 'https://example.com/listing_image_4.jpg');

INSERT INTO bookings (user_id, listing_id, check_in_date, check_out_date, total_price, currency, num_guests) 
VALUES 
(1, 1, '2024-07-01', '2024-07-05', 500.00, 'USD', 2),
(2, 2, '2024-08-10', '2024-08-15', 750.00, 'USD', 4),
(3, 3, '2024-09-20', '2024-09-25', 600.00, 'USD', 3),
(4, 4, '2024-10-15', '2024-10-20', 800.00, 'USD', 2);


INSERT INTO reviews (booking_id, rating, comment, review_date) 
VALUES 
(1, 4, 'Great apartment and location, would definitely stay again!', '2024-07-06'),
(2, 5, 'Amazing beach house, had a fantastic time!', '2024-08-16'),
(3, 4, 'Lovely cabin in the mountains, perfect for a weekend retreat', '2024-09-26'),
(4, 4, 'Awesome loft apartment with stylish decor', '2024-10-21');
