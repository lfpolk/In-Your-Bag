CREATE DATABASE in_your_bag;

CREATE TABLE users(
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--test users

INSERT INTO users (user_name, user_email, user_password) VALUES ('Larson', 'larsonfpolk@gmail.com' , 'password08');