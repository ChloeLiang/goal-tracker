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
  status TEXT DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  user_id INTEGER
);

CREATE TABLE IF NOT EXISTS goals_meta (
  id SERIAL PRIMARY KEY,
  repeat_interval INTEGER,
  goal_id INTEGER
);
