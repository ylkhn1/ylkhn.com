# ylkhn.com

Personal card site for Yelkhan. Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies, no runtime frameworks.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Any static file server works; the site uses root-relative paths (`/assets/...`), so serve it from the repo root rather than opening `index.html` directly from disk.

## Deployment

Target: **Cloudflare Pages**, root domain `ylkhn.com`.

- Build command: none
- Build output directory: `/` (the repo root is the deployable static site)

`_headers` adds basic security headers and long-lived caching for fonts and icons. Cloudflare Pages picks it up automatically.

## Layout

```
index.html                 single page, semantic HTML, OpenGraph meta
404.html                   custom not-found page (Cloudflare Pages serves it automatically)
assets/css/style.css       design tokens, terminal-window styling, reduced-motion rules
assets/js/main.js          EN/RU strings, language toggle (localStorage), typing animation
assets/js/terminal.js      easter egg: fake bash in a <dialog> (` key or footer button)
assets/fonts/              JetBrains Mono Regular, subset to Latin + Cyrillic (woff2)
assets/contributions.svg   GitHub contribution calendar, regenerated daily by the workflow
tools/contributions.py     renders that SVG from GitHub GraphQL data (stdlib only)
.github/workflows/         contributions.yml: daily cron, commits the SVG back if it changed
favicon.svg                ">_" glyph on dark
apple-touch-icon.png       180×180 PNG fallback icon
og.png                     1200×630 OpenGraph preview
_headers                   Cloudflare Pages headers
```

## Easter egg

Press `` ` `` anywhere on the page, or click "launch terminal" in the footer, to open a fake shell. Commands: `help`, `whoami`, `neofetch`, `skills`, `contact`, `clear`, `exit`, and `sudo hire-me`. Esc closes it; the native `<dialog>` handles the focus trap.

## Editing content

All user-facing text lives in the `STRINGS` object at the top of `assets/js/main.js`, keyed by language. Elements pick their string through a `data-i18n="key"` attribute in `index.html`. The default (no-JS) text in the HTML is English.

## Regenerating assets

The font subset was produced with `pyftsubset` (fonttools):

```sh
pyftsubset JetBrainsMono-Regular.ttf \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0400-045F,U+2010-2027,U+2030-203A,U+2190-2193,U+2500-2503,U+25A0-25CF,U+2713-2714" \
  --layout-features="kern,liga,calt" --flavor=woff2 \
  --output-file=assets/fonts/JetBrainsMono-Regular.woff2
```

The OpenGraph image and touch icon were rendered from `tools/og.html` and `favicon.svg` with headless Chrome (see `tools/render.sh`).

### Contribution graph

`assets/contributions.svg` is drawn by `tools/contributions.py` from the GitHub GraphQL contribution calendar. Every square is `currentColor` at a per-level opacity on a transparent background, so the page recolours it through CSS; the root element carries `data-total`, `data-from` and `data-to`, which `main.js` uses for the "N+ contributions in the last year" caption (rounded down to hundreds). `main.js` fetches the file and inlines it; without JavaScript the same file is shown as an `<img>`.

The workflow `.github/workflows/contributions.yml` runs daily (and on manual dispatch) with the default `GITHUB_TOKEN`, regenerates the file and commits it when it changed. To regenerate locally:

```sh
gh api graphql -f login=ylkhn1 -f query='query($login:String!){ user(login:$login){ contributionsCollection{ contributionCalendar{ totalContributions weeks{ contributionDays{ date weekday contributionCount contributionLevel } } } } } }' \
  | python3 tools/contributions.py -o assets/contributions.svg
```
