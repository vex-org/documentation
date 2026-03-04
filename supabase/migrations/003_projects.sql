-- Projects: community project board for Vex ecosystem
-- Run in Supabase SQL editor or via supabase db push

-- ============== PROJECTS ==============
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null unique,
  tagline text,               -- one-liner (max ~120 chars)
  description text,           -- full markdown description / vision
  github_url text,
  website_url text,
  status text not null default 'idea' check (status in ('idea', 'prototype', 'alpha', 'beta', 'stable', 'archived')),
  category text not null default 'other' check (category in (
    'library', 'compiler-plugin', 'web', 'embedded', 'ml',
    'game', 'devtools', 'cli', 'database', 'networking', 'other'
  )),
  looking_for text[] default '{}',  -- e.g. {'backend','frontend','tester','docs','llvm'}
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_projects_owner on public.projects(owner_id);
create index idx_projects_slug on public.projects(slug);
create index idx_projects_status on public.projects(status) where status != 'archived';
create index idx_projects_name_trgm on public.projects using gin(name gin_trgm_ops);

-- ============== PROJECT TAGS ==============
create table public.project_tags (
  project_id uuid not null references public.projects(id) on delete cascade,
  tag text not null,
  primary key (project_id, tag)
);

create index idx_project_tags_tag on public.project_tags(tag);

-- ============== PROJECT MEMBERS ==============
create table public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'interested' check (role in ('owner', 'contributor', 'interested')),
  joined_at timestamptz default now() not null,
  unique(project_id, user_id)
);

create index idx_project_members_project on public.project_members(project_id);
create index idx_project_members_user on public.project_members(user_id);

-- ============== PROJECT MILESTONES ==============
create table public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  completed boolean default false not null,
  sort_order int default 0 not null,
  created_at timestamptz default now() not null
);

create index idx_project_milestones_project on public.project_milestones(project_id);

-- ============== RLS ==============
alter table public.projects enable row level security;
alter table public.project_tags enable row level security;
alter table public.project_members enable row level security;
alter table public.project_milestones enable row level security;

-- projects: read all non-archived (or own), write owner
create policy "projects_select" on public.projects for select using (
  status != 'archived' or owner_id = auth.uid()
);
create policy "projects_insert" on public.projects for insert with check (auth.uid() = owner_id);
create policy "projects_update_own" on public.projects for update using (auth.uid() = owner_id);
create policy "projects_delete_own" on public.projects for delete using (auth.uid() = owner_id);

-- project_tags: read all, write project owner
create policy "project_tags_select" on public.project_tags for select using (true);
create policy "project_tags_insert" on public.project_tags for insert with check (
  exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())
);
create policy "project_tags_delete" on public.project_tags for delete using (
  exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())
);

-- project_members: read all, insert own (join), delete own or project owner can remove
create policy "project_members_select" on public.project_members for select using (true);
create policy "project_members_insert" on public.project_members for insert with check (auth.uid() = user_id);
create policy "project_members_update" on public.project_members for update using (
  exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())
);
create policy "project_members_delete" on public.project_members for delete using (
  auth.uid() = user_id or exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())
);

-- project_milestones: read all, write project owner
create policy "project_milestones_select" on public.project_milestones for select using (true);
create policy "project_milestones_insert" on public.project_milestones for insert with check (
  exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())
);
create policy "project_milestones_update" on public.project_milestones for update using (
  exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())
);
create policy "project_milestones_delete" on public.project_milestones for delete using (
  exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid())
);
