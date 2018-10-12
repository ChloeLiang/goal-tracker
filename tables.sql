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
  start_date DATE,
  end_date DATE,
  status INTEGER,
  complete_date DATE,
  user_id INTEGER
);

CREATE TABLE IF NOT EXISTS progress (
  id SERIAL PRIMARY KEY,
  amount INTEGER,
  created_at DATE DEFAULT now(),
  goal_id INTEGER
);
