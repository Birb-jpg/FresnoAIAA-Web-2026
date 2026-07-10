# My Site Monorepo

Two Astro sites, one repo:

| App | What it is | Where it lives |
|---|---|---|
| [`apps/landing`](./apps/landing) | Marketing / landing page | `yourdomain.com` |
| [`apps/wiki`](./apps/wiki) | Docs, built with [Starlight](https://starlight.astro.build) | `wiki.yourdomain.com` |

They're kept fully independent - different designs, no shared components.
The only thing tying them together is the workspace tooling.

---

## Getting started

You'll need [pnpm](https://pnpm.io):

```bash
npm install -g pnpm
```

Then from the repo root:

```bash
pnpm install
```

This installs dependencies for both apps in one go.

---

## Running locally

Each app runs on its own dev server - open two terminals if you want both up at once.

```bash
pnpm dev:landing   # → apps/landing, usually http://localhost:4321
pnpm dev:wiki      # → apps/wiki,   usually http://localhost:4322
```

---

## Building

```bash
pnpm build:landing
pnpm build:wiki

# or build everything at once
pnpm build
```

---

## Adding content

**Landing page** - edit the `.astro` files directly under `apps/landing/src/pages/`.

**Wiki** - drop a new `.md` or `.mdx` file into:

```
apps/wiki/src/content/docs/guides/
apps/wiki/src/content/docs/reference/
```

It'll show up in the sidebar automatically - no config edits needed for a
normal new page.

---

## Deploying

The two apps deploy as **separate projects** on the same host (Vercel,
Netlify, Cloudflare Pages, etc.), pointing at this same repo:

| Project | Root directory | Domain |
|---|---|---|
| Landing | `apps/landing` | `yourdomain.com` |
| Wiki | `apps/wiki` | `wiki.yourdomain.com` |

Most hosts let you spin up two projects from one repo like this and assign
each its own domain - you don't need two separate git repos.

---

## Adding a CMS (later)

Not set up yet, and may never be strictly necessary - Starlight's content
already lives as plain markdown, which is a good foundation either way.

If/when it's worth it, a **git-based CMS** like [Keystatic](https://keystatic.com)
or [Decap CMS](https://decapcms.org) is the natural fit here: it edits the
same markdown files in this repo, no separate database or backend required.

---

## Project structure

```
.
├── apps/
│   ├── landing/     Astro site - marketing page
│   └── wiki/        Astro + Starlight - documentation
├── pnpm-workspace.yaml
├── package.json     workspace-level scripts (dev:*, build)
├── CLAUDE.md         context for Claude Code
└── README.md
```