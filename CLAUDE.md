# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

A pnpm workspace monorepo containing two independent Astro sites:

- `apps/landing` — marketing/landing page, deployed to `yourdomain.com`
- `apps/wiki` — documentation site built with Starlight, deployed to `wiki.yourdomain.com`

The two apps are **intentionally decoupled** — no shared UI/component package.
They have different visual designs and different purposes, so don't suggest
or introduce shared components between them unless explicitly asked.

## Commands

Run from the repo root unless noted.

```bash
pnpm install              # install everything (run after any package.json change)

pnpm dev:landing          # dev server for apps/landing
pnpm dev:wiki             # dev server for apps/wiki

pnpm build                # build both apps
pnpm --filter landing build
pnpm --filter wiki build
```

There is no root dev script that runs both apps at once — run each in its
own terminal (they use different ports by default).

## Structure

```
apps/
  landing/     plain Astro app, no CMS/content-collections assumptions
  wiki/        Starlight app — content lives in src/content/docs/**
```

- Landing page content/markup lives directly in `.astro` files under
  `apps/landing/src/pages/`.
- Wiki pages are markdown/MDX under `apps/wiki/src/content/docs/`. New files
  dropped into `guides/` or `reference/` are picked up automatically by the
  sidebar via `autogenerate` — don't hand-edit the sidebar config for routine
  page additions, only for restructuring sections.

## Working in `apps/wiki`

- Content collection schema comes from Starlight's `docsSchema()` — don't
  invent custom frontmatter fields without checking they're supported or
  extending the schema in `content.config.ts` first.
- Prefer `.md` for plain docs, `.mdx` only when a page needs components/JSX.

## Working in `apps/landing`

- No content collections or CMS wired up yet. Content is hardcoded in
  `.astro` files. If a CMS gets added later, it will likely be git-based
  (e.g. Keystatic) rather than a hosted backend — keep that in mind if asked
  to help introduce one, i.e. prefer file-based content over introducing a
  database/API dependency.

## Conventions

- Package manager: **pnpm** only. Don't add npm/yarn lockfiles.
- Each app manages its own `astro.config.mjs`, `tsconfig.json`, and
  dependencies — don't hoist app-specific deps to the root `package.json`.
- Keep `site:` in each `astro.config.mjs` accurate to its real deploy domain;
  Starlight and sitemap generation depend on it.

## Deployment

Each app deploys as a **separate project** on the hosting platform, both
pointing at this same repo, differentiated by "root directory":

- `apps/landing` → `yourdomain.com`
- `apps/wiki` → `wiki.yourdomain.com`

When editing deploy-related config (adapters, redirects, headers), make sure
changes are scoped to the correct app — they do not share hosting config.