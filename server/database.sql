CREATE DATABASE in_your_bag;

CREATE TABLE users(
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE bag(

    disc_id int REFERENCES discs(disc_id),
    user_id UUID REFERENCES users(user_id),
    plastic VARCHAR(40)
);

CREATE TABLE discs(
    disc_id SERIAL PRIMARY KEY,
    mold VARCHAR(40),
    manufacturer VARCHAR(30),
    distance int,
    turn int,
    fade int,
    type VARCHAR(40)
);

--test users

INSERT INTO users (user_name, user_email, user_password) VALUES ('Larson', 'larsonfpolk@gmail.com' , 'password08');

INSERT INTO bag (disc_id, user_id, plastic) VALUES (897,'7a7e51ed-bf05-44c8-9638-0846d4c09677','Star');