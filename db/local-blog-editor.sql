-- Applied to the development database during editor setup.
-- For external hosting, apply in the PostgreSQL query interface for the
-- explicitly selected editor database. Never run as a startup/build hook.
CREATE TABLE IF NOT EXISTS local_blog_versions (
  id uuid PRIMARY KEY,
  parent_post_id text NOT NULL,
  location_id text NOT NULL,
  slug text NOT NULL,
  record jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(location_id, slug),
  CHECK (record->>'status' IN ('draft','scheduled','published'))
);
