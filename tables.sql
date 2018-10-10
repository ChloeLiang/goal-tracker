CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS goals (
  id SERIAL PRIMARY KEY,
  title TEXT,
  amount INTEGER,
  unit TEXT,
  user_id INTEGER
);

CREATE TABLE IF NOT EXISTS goals_meta (
  id SERIAL PRIMARY KEY,
  repeat_start DATE,
  repeat_interval INTEGER,
  repeat_end DATE,
  goal_id INTEGER
);
