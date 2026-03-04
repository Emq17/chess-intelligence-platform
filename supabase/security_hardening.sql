-- Run in Supabase SQL Editor for project hardening.
-- Goal: keep chess snapshots private and accessible only through server-side service-role calls.

alter table if exists public.chess_game_snapshots enable row level security;

drop policy if exists "public read snapshots" on public.chess_game_snapshots;
drop policy if exists "authenticated read snapshots" on public.chess_game_snapshots;
drop policy if exists "anon read snapshots" on public.chess_game_snapshots;
drop policy if exists "deny client access" on public.chess_game_snapshots;

revoke all privileges on table public.chess_game_snapshots from anon, authenticated;

create policy "deny client access"
on public.chess_game_snapshots
as restrictive
for all
to anon, authenticated
using (false)
with check (false);
