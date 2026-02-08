-- Vex Hub: initial schema (packages, blog, comments, claps)
-- Run in Supabase SQL editor or via supabase db push

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;

-- ============== PROFILES ==============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_profiles_username on public.profiles(username);

-- Trigger: create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============== PACKAGES ==============
create table public.packages (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  repository_url text,
  homepage text,
  documentation text,
  license text,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_packages_owner on public.packages(owner_id);
create index idx_packages_name_trgm on public.packages using gin(name gin_trgm_ops);

create table public.versions (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  version text not null,
  manifest_json jsonb,
  readme_text text,
  yanked boolean default false not null,
  artifact_path text not null,
  published_at timestamptz default now() not null,
  unique(package_id, version)
);

create index idx_versions_package on public.versions(package_id);

create table public.package_downloads (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  version_id uuid not null references public.versions(id) on delete cascade,
  date date not null,
  count bigint default 0 not null,
  unique(package_id, version_id, date)
);

create index idx_package_downloads_lookup on public.package_downloads(package_id, date);

-- ============== BLOG ==============
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text not null unique,
  body_md text not null,
  excerpt text,
  cover_image_path text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_posts_author on public.posts(author_id);
create index idx_posts_status_published on public.posts(published_at desc) where status = 'published';
create index idx_posts_slug on public.posts(slug);

create table public.post_tags (
  post_id uuid not null references public.posts(id) on delete cascade,
  tag text not null,
  primary key (post_id, tag)
);

create index idx_post_tags_tag on public.post_tags(tag);

create table public.post_claps (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now() not null,
  unique(post_id, user_id)
);

create index idx_post_claps_post on public.post_claps(post_id);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  body text not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_comments_post on public.comments(post_id);
create index idx_comments_parent on public.comments(parent_id);

-- ============== RLS ==============
alter table public.profiles enable row level security;
alter table public.packages enable row level security;
alter table public.versions enable row level security;
alter table public.package_downloads enable row level security;
alter table public.posts enable row level security;
alter table public.post_tags enable row level security;
alter table public.post_claps enable row level security;
alter table public.comments enable row level security;

-- profiles: read all, update own
create policy "profiles_select" on public.profiles for select using (true);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- packages: read all, write owner
create policy "packages_select" on public.packages for select using (true);
create policy "packages_insert" on public.packages for insert with check (auth.uid() = owner_id);
create policy "packages_update_own" on public.packages for update using (auth.uid() = owner_id);
create policy "packages_delete_own" on public.packages for delete using (auth.uid() = owner_id);

-- versions: read all, insert/update package owner
create policy "versions_select" on public.versions for select using (true);
create policy "versions_insert" on public.versions for insert with check (
  exists (select 1 from public.packages p where p.id = package_id and p.owner_id = auth.uid())
);
create policy "versions_update_own" on public.versions for update using (
  exists (select 1 from public.packages p where p.id = package_id and p.owner_id = auth.uid())
);

-- package_downloads: read all; insert/update for stats (authenticated or anon can be restricted as needed)
create policy "package_downloads_select" on public.package_downloads for select using (true);
create policy "package_downloads_insert" on public.package_downloads for insert with check (true);
create policy "package_downloads_update" on public.package_downloads for update using (true);

-- posts: read published or own
create policy "posts_select" on public.posts for select using (
  status = 'published' or author_id = auth.uid()
);
create policy "posts_insert" on public.posts for insert with check (auth.uid() = author_id);
create policy "posts_update_own" on public.posts for update using (auth.uid() = author_id);
create policy "posts_delete_own" on public.posts for delete using (auth.uid() = author_id);

-- post_tags: read all, write post author
create policy "post_tags_select" on public.post_tags for select using (true);
create policy "post_tags_insert" on public.post_tags for insert with check (
  exists (select 1 from public.posts p where p.id = post_id and p.author_id = auth.uid())
);
create policy "post_tags_delete" on public.post_tags for delete using (
  exists (select 1 from public.posts p where p.id = post_id and p.author_id = auth.uid())
);

-- post_claps: read all, insert/delete own
create policy "post_claps_select" on public.post_claps for select using (true);
create policy "post_claps_insert" on public.post_claps for insert with check (auth.uid() = user_id);
create policy "post_claps_delete_own" on public.post_claps for delete using (auth.uid() = user_id);

-- comments: read all, insert own, update/delete own
create policy "comments_select" on public.comments for select using (true);
create policy "comments_insert" on public.comments for insert with check (auth.uid() = author_id);
create policy "comments_update_own" on public.comments for update using (auth.uid() = author_id);
create policy "comments_delete_own" on public.comments for delete using (auth.uid() = author_id);

-- ============== STORAGE (run in Dashboard or add bucket policies) ==============
-- Buckets: artifacts (package tarballs), blog-images (post images)
-- Create via Supabase Dashboard > Storage or:
-- insert into storage.buckets (id, name, public) values ('artifacts', 'artifacts', false), ('blog-images', 'blog-images', true);
