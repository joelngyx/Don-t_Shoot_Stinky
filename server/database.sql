CREATE TABLE scoreboard (
  entry_id SERIAL PRIMARY KEY,
  player_name VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL
);