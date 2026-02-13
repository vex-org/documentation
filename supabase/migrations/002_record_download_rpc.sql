-- RPC: record a download (call from frontend on "Copy install" or from CLI after actual download)
-- Uses today's date; upserts into package_downloads and increments count by 1.
create or replace function public.record_package_download(package_name text, version text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_package_id uuid;
  v_version_id uuid;
  v_today date := current_date;
begin
  select id into v_package_id from packages where name = package_name limit 1;
  if v_package_id is null then return; end if;
  select id into v_version_id from versions where package_id = v_package_id and versions.version = record_package_download.version limit 1;
  if v_version_id is null then return; end if;
  insert into package_downloads (package_id, version_id, date, count)
  values (v_package_id, v_version_id, v_today, 1)
  on conflict (package_id, version_id, date) do update set count = package_downloads.count + 1;
end;
$$;


DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'versions'
        AND column_name = 'readme_text'
    ) THEN
        ALTER TABLE versions ADD COLUMN readme_text TEXT;
    END IF;
END $$;