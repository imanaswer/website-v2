-- Baseline schema (pre og_image). Safe to run on an existing DB: every statement
-- uses "if not exists", so it adds nothing that already exists.

create table if not exists news (
  id serial primary key,
  title text not null,
  category text,
  body text,
  date date not null default current_date,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists faculty (
  id serial primary key,
  name text not null,
  subject text,
  department text,
  photo_url text,
  sort_order integer not null default 0
);

create table if not exists jobs (
  id serial primary key,
  role text not null,
  department text,
  type text,
  location text,
  closes_on date,
  description text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists alumni (
  id serial primary key,
  name text not null,
  batch_year text,
  role text,
  quote text,
  photo_url text,
  sort_order integer not null default 0
);

create table if not exists gallery (
  id serial primary key,
  title text,
  category text,
  kind text not null default 'photo',
  image_url text,
  video_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
