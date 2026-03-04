# Chess Intelligence Platform

A production-style analytics application that turns raw online chess games into performance intelligence, trend tracking, and actionable coaching insights.

The implementation spans data ingestion, API design, analytics modeling, and frontend product delivery.

## System Overview
- Integrates two external data ecosystems (`Lichess` + `Chess.com`) into a unified analysis workflow
- Converts unstructured game records (PGN) into consistent metrics and visual coaching signals
- Uses a snapshot strategy with Supabase to make analytics fast, stable, and deploy-ready
- Ships as a polished React + Vite web experience with real API routes (not a static mock)

## Functional Scope
- Multi-source game ingestion and normalization
- Historical snapshot storage and retrieval
- Performance dashboards (results, trends, move-quality signals, opening patterns)
- AI-style coaching report UI for decision support and improvement focus
- Filtered analysis by account/time windows for practical review workflows

## Technical Stack
- Frontend: React + TypeScript + Vite
- Styling/UI: TailwindCSS + DaisyUI + custom CSS system
- API layer: serverless routes in `api/`
- Data store: Supabase (snapshot persistence)
- Sources: Lichess and Chess.com APIs

## Focus Areas
- Product thinking: translated complex data into an interpretable coaching UX
- Systems thinking: designed a resilient ingestion + snapshot pipeline
- API engineering: clean separation between sync and read paths
- Data fluency: built metrics that are useful for decision-making, not just charts
- Execution quality: deployable structure, env-based config, and clear local setup

## Development Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Add credentials to `.env`:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. In Supabase SQL Editor, harden the snapshots table (private by default):
   ```sql
   alter table public.chess_game_snapshots enable row level security;

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
   ```
   Expected SQL Editor response: `Success. No rows returned`.
   This app reads/writes through serverless API routes using the service role key, so no `anon` read policy is required.
   You can also run the same SQL from [`supabase/security_hardening.sql`](./supabase/security_hardening.sql).
5. Start the app:
   ```bash
   npm run dev
   ```

Open `http://localhost:5173` (it redirects to `/hobby/chess`).

## Service Endpoints
- `api/chess-sync.js`: pulls latest games from source APIs and writes snapshots
- `api/chess-data.js`: reads latest snapshots for dashboard consumption
- `api/_supabase.js`: Supabase config + header helpers

## Deployment Configuration
- Deploy to Vercel as a standard Vite + serverless API project
- Set the same env vars in Vercel project settings
- You can reuse one Supabase database across deployments or isolate by environment (recommended for staging/prod separation)
