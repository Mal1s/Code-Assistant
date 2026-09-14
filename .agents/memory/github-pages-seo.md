---
name: GitHub Pages SEO routing
description: Deep links in this client-rendered site need physical static entry files when published from the repository root.
---

GitHub Pages does not provide the server-side fallback rewrite that the Express deployment has. A client-router URL can work after internal navigation but still return GitHub's HTTP 404 on a direct crawler request. Production builds must therefore emit a route directory with `index.html` for every indexable path, plus a sitemap containing only those paths.

**Why:** Yandex removed `/o-kompanii` after receiving HTTP 404 even though the React route existed in the source.

**How to apply:** When adding an indexable route, update the static route generation and sitemap together, then verify the published root-serving behavior rather than relying only on Vite's SPA fallback.