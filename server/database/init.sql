-- # id uuid default gen_random_uuid() not null
CREATE table duties(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(200),
)