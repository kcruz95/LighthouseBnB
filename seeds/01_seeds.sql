INSERT INTO users (name, email, password)
VALUES ('Joao', '1@1.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Juan', '2@2.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Jean', '3@3.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
('Chen', '4@4.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');
(4, 4, '2021-07-03', '2021-07-14');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, province, city, street, post_code, active)
VALUES (1, 'Posto 6', 'description', 'thumbnailPhoto', 'coverPhoto', 320, 1, 2, 3, 'Brazil', 'RJ', 'Rio de Janeiro', 'Rua Sa Ferreira'),
(2, 'Baires', 'description', 'thumbnailPhoto', 'coverPhoto', 270, 0, 2, 2, 'Argentina', 'Buenos Aires', 'Buenos Aires', 'Calle Defensa'),
(3, 'Village', 'description', 'thumbnailPhoto', 'coverPhoto', 420, 1, 3, 3, 'Canada', 'Quebec', 'Montreal', 'Cartier Street'),
(4, 'Chimei', 'description', 'thumbnailPhoto', 'coverPhoto', 115, 0, 2, 3, 'Taiwan', 'Taiwan', 'Taipei', 'Taishun Street'),

INSERT INTO property_reviews (guest_id, property_id, reservation_id,rating, message)
VALUES (1, 1, 1, 3,'msg1'),
(2, 2, 2, 4,'msg2'),
(3, 3, 3, 4,'msg3');
(4, 4, 4, 2,'msg4');