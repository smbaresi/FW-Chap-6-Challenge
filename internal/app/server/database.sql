CREATE DATABASE binar_db;

CREATE TABLE biodata(
    user_game_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    FOREIGN KEY (user_game_id) REFERENCES user_game (user_game_id)
);

CREATE TABLE user_game(
    user_game_id SERIAL PRIMARY KEY,
    user_name VARCHAR(20) UNIQUE NOT NULL,
    user_password VARCHAR(20) NOT NULL
);

CREATE TABLE history(
    user_game_id SERIAL PRIMARY KEY,
    win INT NOT NULL,
    lose INT NOT NULL,
    FOREIGN KEY (user_game_id) REFERENCES user_game (user_game_id)
);

