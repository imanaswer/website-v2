-- Faculty profile fields + School Management table. Idempotent.

alter table faculty add column if not exists designation text;
alter table faculty add column if not exists qualification text;
alter table faculty add column if not exists subjects text;
alter table faculty add column if not exists experience text;
alter table faculty add column if not exists bio text;
alter table faculty add column if not exists expertise text;
alter table faculty add column if not exists achievements text;
alter table faculty add column if not exists certifications text;
alter table faculty add column if not exists languages text;
alter table faculty add column if not exists email text;
alter table faculty add column if not exists office_hours text;
alter table faculty add column if not exists active boolean not null default true;

create table if not exists management (
  id serial primary key,
  name text not null,
  position text,
  photo_url text,
  bio text,
  message text,
  years_of_service text,
  education text,
  responsibilities text,
  achievements text,
  email text,
  sort_order integer not null default 0,
  active boolean not null default true
);
