INSERT INTO roles(name) VALUES
                            ('ROLE_ADMIN'),
                            ('ROLE_CUSTOMER'),
                            ('ROLE_GUEST');

-- password: daica123
INSERT INTO users(email,password,first_name,last_name,phone,status) VALUES
                                                                        ('admin@sport.com','$2a$10$rULaC18btpFV9HMKPcsYl.CVF.VHB3NShmq1eb2R9NLyYJo3OT9hq','System','Admin','0900000001','ACTIVE'),
                                                                        ('john@gmail.com','$2a$10$rULaC18btpFV9HMKPcsYl.CVF.VHB3NShmq1eb2R9NLyYJo3OT9hq','John','Nguyen','0900000002','ACTIVE'),
                                                                        ('anna@gmail.com','$2a$10$rULaC18btpFV9HMKPcsYl.CVF.VHB3NShmq1eb2R9NLyYJo3OT9hq','Anna','Tran','0900000003','ACTIVE'),
                                                                        ('david@gmail.com','$2a$10$rULaC18btpFV9HMKPcsYl.CVF.VHB3NShmq1eb2R9NLyYJo3OT9hq','David','Le','0900000004','ACTIVE'),
                                                                        ('mike@gmail.com','$2a$10$rULaC18btpFV9HMKPcsYl.CVF.VHB3NShmq1eb2R9NLyYJo3OT9hq','Mike','Pham','0900000005','ACTIVE'),
                                                                        ('staff@sport.com','$2a$10$rULaC18btpFV9HMKPcsYl.CVF.VHB3NShmq1eb2R9NLyYJo3OT9hq','Staff','One','0900000006','ACTIVE'),
                                                                        ('user1@gmail.com','$2a$10$rULaC18btpFV9HMKPcsYl.CVF.VHB3NShmq1eb2R9NLyYJo3OT9hq','User','One','0900000007','ACTIVE'),
                                                                        ('user2@gmail.com','$2a$10$rULaC18btpFV9HMKPcsYl.CVF.VHB3NShmq1eb2R9NLyYJo3OT9hq','User','Two','0900000008','ACTIVE');

INSERT INTO user_roles VALUES
                           (1,1),
                           (2,2),
                           (3,2),
                           (4,2),
                           (5,2),
                           (6,3),
                           (7,2),
                           (8,2);

INSERT INTO addresses(user_id,full_name,phone,province,district,ward,address_line,is_default) VALUES
                                                                                                  (2,'John Nguyen','0900000002','Hanoi','Cau Giay','Dich Vong','12 Nguyen Phong',true),
                                                                                                  (3,'Anna Tran','0900000003','HCM','District 1','Ben Nghe','45 Le Loi',true),
                                                                                                  (4,'David Le','0900000004','Danang','Hai Chau','Thach Thang','99 Tran Phu',true),
                                                                                                  (5,'Mike Pham','0900000005','Hanoi','Dong Da','Lang Thuong','20 Chua Lang',true),
                                                                                                  (7,'User One','0900000007','Hue','Huong Tra','Ward1','12 ABC',true);

-- ===== LEVEL 1: ROOT =====
INSERT INTO categories(name, slug, parent_id) VALUES
                                                  ('Shoes','shoes',NULL),        -- id = 1
                                                  ('Clothing','clothing',NULL),  -- id = 2
                                                  ('Accessories','accessories',NULL); -- id = 3


-- ===== LEVEL 2: DOMAIN =====
INSERT INTO categories(name, slug, parent_id) VALUES
-- Shoes
('Football Shoes','football-shoes',1),   -- id = 4
('Fitness Shoes','fitness-shoes',1),     -- id = 5
('Swimming Shoes','swimming-shoes',1),   -- id = 6

-- Clothing
('Football Clothing','football-clothing',2), -- id = 7
('Fitness Clothing','fitness-clothing',2),   -- id = 8
('Swimming Clothing','swimming-clothing',2), -- id = 9

-- Accessories
('Football Accessories','football-accessories',3), -- id = 10
('Fitness Accessories','fitness-accessories',3),   -- id = 11
('Swimming Accessories','swimming-accessories',3); -- id = 12


-- ===== LEVEL 3: LEAF =====
INSERT INTO categories(name, slug, parent_id) VALUES

-- ===== SHOES =====
('Firm Ground Boots','firm-ground-boots',4),
('Turf Shoes','turf-shoes',4),
('Indoor Football Shoes','indoor-football-shoes',4),

('Training Shoes','training-shoes',5),
('Running Shoes','running-shoes',5),
('Gym Shoes','gym-shoes',5),

('Pool Sandals','pool-sandals',6),

-- ===== CLOTHING =====
('Football Jerseys','football-jerseys',7),
('Football Shorts','football-shorts',7),
('Football Socks','football-socks',7),

('Gym T-Shirts','gym-tshirts',8),
('Gym Tank Tops','gym-tank-tops',8),
('Gym Shorts','gym-shorts',8),
('Gym Leggings','gym-leggings',8),

('Swimwear','swimwear',9),
('Swimming Trunks','swimming-trunks',9),
('Wetsuits','wetsuits',9),

-- ===== ACCESSORIES =====
('Shin Guards','shin-guards',10),
('Goalkeeper Gloves','goalkeeper-gloves',10),
('Football Bags','football-bags',10),

('Resistance Bands','resistance-bands',11),
('Skipping Ropes','skipping-ropes',11),
('Gym Gloves','gym-gloves',11),

('Swimming Goggles','swimming-goggles',12),
('Swim Caps','swim-caps',12),
('Dry Bags','dry-bags',12);


INSERT INTO coupons(code,discount_type,discount_value,min_order_value,start_date,end_date,status) VALUES
                                                                                                      ('SALE10','PERCENT',10,1000000,'2024-01-01','2025-01-01','ACTIVE'),
                                                                                                      ('SALE20','PERCENT',20,2000000,'2024-01-01','2025-01-01','ACTIVE'),
                                                                                                      ('SHIPFREE','FIXED',30000,500000,'2024-01-01','2025-01-01','ACTIVE'),
                                                                                                      ('WELCOME','FIXED',50000,700000,'2024-01-01','2025-01-01','ACTIVE'),
                                                                                                      ('VIP','PERCENT',30,3000000,'2024-01-01','2025-01-01','ACTIVE');
