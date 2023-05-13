CREATE TABLE `order` (
    id INT(255) PRIMARY KEY,
    user_id INT(255), 
    `name` VARCHAR(255),
    price INT(255),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (update_time)
) CHARACTER SET utf8mb4 collate utf8mb4_general_ci;


CREATE TABLE order_good (
    id INT(255) PRIMARY KEY,
    order_id INT(255),
    good_id INT(255),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci; 


CREATE TABLE good (
    id INT(255) PRIMARY KEY,
    `name` VARCHAR(255),
    price INT(255),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (update_time)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


CREATE TABLE user (
    id INT(255) PRIMARY KEY,
    sex TINYINT(1),
    sex_desc VARCHAR(1),
    username VARCHAR(255),
    password VARCHAR(255),
    mail VARCHAR(255),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;




INSERT INTO user (id, sex, sex_desc, username, `password`, mail) VALUES (65535, 1, '男', 'yaohan', 'bdregegregre', 'yaohan@gmail.com'), (65536, 2, '女', 'nawa', 'ffbfgetey54tnry5fb', 'nawa@gmail.com'), (65537, 1, '男', 'kensh', 'bfrrrrrrrvvsseevdvvdvn555', 'kensh@gmail.com');