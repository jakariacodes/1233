# Deploying Next Online LLC to Hostinger

This guide explains how to build the site from the GitHub source and host it on
Hostinger shared hosting (Apache), including all required keys.

---

## 1. Required environment keys

Create a file named `.env` in the project root **before building** with these
exact contents (they are public/publishable keys — safe to ship in frontend code):

```env
VITE_SUPABASE_PROJECT_ID="lppafhegshtjxcahhmuq"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_X1RY5b2DBJdGXv1pysNSow_Fz7ielic"
VITE_SUPABASE_URL="https://lppafhegshtjxcahhmuq.supabase.co"
```

> These values are baked into the JavaScript bundle **at build time**.
> Changing them later requires a rebuild — the live site does not read `.env`.

## 2. Build the site

```bash
# 1. Download the ZIP from GitHub and extract it (or git clone)
# 2. Install dependencies
npm install        # or: bun install

# 3. Build for production
npm run build      # or: bun run build
```

The build output is generated in the `.output/` directory.

- **Static hostable files** live in `.output/public/` — this is what you upload
  to Hostinger `public_html`.
- The `.output/server/` folder needs a Node.js server and will **not** run on
  Hostinger shared hosting. Everything on this site (database, auth, admin
  panel) talks directly to Lovable Cloud from the browser, so the static files
  are sufficient for normal use.

## 3. Upload to Hostinger

1. Open **hPanel → File Manager** (or use FTP).
2. Go to `public_html/`.
3. Upload **all contents** of `.output/public/` into `public_html/`
   (index.html, assets/, favicon.png, etc.).
4. Make sure the included **`.htaccess`** file is present in `public_html/`.
   It enables SPA routing (fixes 404 errors on page refresh) and caching.

## 4. Admin panel & database

- The admin panel lives at `yourdomain.com/admin-login` and works fully through
  the cloud database — no extra server setup needed on Hostinger.
- Login with your admin account; the database, orders, services, chat settings,
  and logo management all continue to work because they run on Lovable Cloud.

## 5. Optional: Node.js hosting instead

If you later move to Hostinger **VPS** or a Node-capable host, you can run the
full server build instead:

```bash
node .output/server/index.mjs
```

This enables server-side rendering. For shared hosting, use the static method
above.

---

### Troubleshooting

| Problem | Fix |
|---|---|
| 404 on refresh of inner pages | `.htaccess` missing or `mod_rewrite` disabled — re-upload it to `public_html` |
| Blank page / data not loading | `.env` was missing during build — add it and rebuild |
| Old content after update | Clear browser cache; assets are cache-busted by filename |
