# Crowd Genie — Redesign: Project Context

This file exists so that if this folder is moved or reopened in a fresh session
(with no memory of the conversation that built it), the next person or the
next Claude session can understand what this project is, what it replaces,
and what decisions were already made — without re-deriving them.

## What this is

A React + Vite rebuild of **crowd-genie.com**, a MAS-licensed Singapore SME
crowdfunding platform (invoice financing, term loans, property-backed
lending). Entity: Crowd Genie Financial Services Pte. Ltd., UEN 201600134C.

The project started from a **design audit + redesign deck** (a Claude
Artifact) that tore down the live site and proposed a new design system and
page-by-page redesign. That artifact is a presentation/mockup, not code. This
repo is the actual working implementation of that redesign as a real React
app — routes, components, real interaction (form validation, tabs, theming),
not static mockup HTML.

## Original site audit (why this redesign exists)

Captured from the live crowd-genie.com before the redesign:

- **Home** — dated stock photography (toy houses, coin jars) carrying the
  visual argument; inconsistent CTA casing ("Signup" vs "Sign Up" vs "Sign
  In"); purple-on-purple product tiles with poor contrast; no real
  performance data on the page meant to sell the yield.
- **The Team** — four names/titles, no bios or track record, headshots
  desaturated to the point of looking unfinished.
- **Statistics** — the entire page was an embedded PDF viewer ("Loading
  PDF…"). Not indexable, not responsive, unreadable on mobile. This was the
  single worst pattern on the site.
- **FAQs** — good structure (General / Borrower / Lender split), just flat,
  unstyled list with no visual rhythm.
- **Contact Us** — the Google Maps embed was broken (visible JS/API-key
  error, "Sorry! Something went wrong."), sitting right next to trust-building
  copy on a financial services page. No field-level form validation.
- **Sign Up / Sign In** — functional Investor/Borrower toggle, consistent
  between the two screens, but the surrounding chrome undersold a regulated
  financial product.
- **Site-wide** — content scrolled inside a fixed-height inner container
  instead of the real document (broken deep-linking, awkward trackpad
  scrolling); body copy ran in Roboto at default weights with no type scale;
  every hero reused the same handful of stock photos.

## Design system

Defined in `src/styles/tokens.css`. Three-state theme contract:
- bare `:root` = light
- `@media (prefers-color-scheme: dark)` (unless an explicit light choice
  wins) = system dark
- `:root[data-theme="dark"|"light"]` = explicit user toggle (persisted to
  `localStorage` under `cg-theme`, see `src/context/ThemeContext.jsx`)

**Colors** — kept the brand's existing purple (`#662D91`) and built a full
ramp off it, plus a warm paper-toned neutral background instead of cold gray,
plus an antique gold (`#C08A2E` / `#A8792A`) pulled from the brand's own coin
photography, repurposed as the semantic color for yield/returns/positive
figures. Fixed "always-dark" brand surfaces (`--deep-surface*`) exist
separately from the theme-flipped ramp (`--purple-*`) — these are used
anywhere text/buttons sit on a permanently-dark brand panel (footer, the
Investors panel, auth art panel, primary buttons, avatar chips) and must
**not** be redefined per theme, because `--purple-700` etc. flip to light
values in dark mode (by design, for text-on-dark-bg elsewhere) which makes
them invisible if reused for a fixed dark surface's own text/buttons. This
exact bug (an "invisible button in dark mode") happened once already with a
white CTA button on the dark Investors panel — see `.btn-light` in
`src/components/Button.css` for the fix and the comment explaining why.

**Type** — `Newsreader` (serif, headings) + `Inter` (body) + `IBM Plex Mono`
(numerals/data/kickers). Originally `Fraunces` + `Public Sans`; swapped on
request partway through this project. If you're auditing "why does the type
system look inconsistent," check every CSS file for stray `Fraunces`/`Public
Sans` references that might have been missed in a partial find-replace.

**Layout** — an editorial-ledger feel: generous margins, a real document
scroll (not a locked inner div — this was one of the worst bugs on the old
site), a financial-ticker stat strip with tabular numerals, one consistent
card grammar (border + radius + padding + shadow) reused across product
tiles, team cards, and audit-style content.

**Full-bleed sections** (colored bands spanning the viewport edge-to-edge,
like the Home page's SME Borrowers/Investors split and the stats ticker):
these must have their *text content* aligned to the same left/right edge as
everything else on the page (the `.wrap` max-width:1160px + padding:24px
container used everywhere). Do **not** try to solve this with
`100vw`-based padding math — it was attempted and reverted; `100vw` includes
the scrollbar width while `%`-based layout (what `.wrap` actually uses)
doesn't, so the two systems land a few pixels apart no matter how carefully
the scrollbar width is compensated for (a `calc(100vw - 100%)` trick was
tried and abandoned — see git history / conversation if curious). The
working pattern, used in `Home.jsx`/`Home.css` for the ticker and the
SME/Investors split: a full-bleed **background layer** (`position:
absolute`, sized independently) sits behind a normal `.wrap`-classed
**content layer**, so the content always lines up with the rest of the site
by construction, and the color band is a separate concern.

## Pages / routes (`src/App.jsx`)

| Route | File | Notes |
|---|---|---|
| `/` | `pages/Home.jsx` | Hero, stat ticker, SME/Investor split, "How Investing Works" steps, Products grid, Partners |
| `/the-team` | `pages/Team.jsx` | Team cards — see "Team page" below, this one had several redesign passes |
| `/statistics` | `pages/Statistics.jsx` | Replaces the old embedded-PDF page with real stat cards + an inline SVG bar chart, with a loading skeleton |
| `/faqs` | `pages/FAQs.jsx` | Tabbed (General/Borrower/Lender) accordion, data in `src/data/faqs.js` |
| `/contact-us` | `pages/Contact.jsx` | Real client-side validated form + a static SVG "office card" instead of the broken Google Maps embed |
| `/signup`, `/signup/:role` | `pages/SignUp.jsx` | Investor/Borrower toggle, shares `AuthLayout` |
| `/signin` | `pages/SignIn.jsx` | Shares `AuthLayout` |

Shared content data lives in `src/data/content.js` (team, products, ticker
stats, steps, partners, stat cards, quarterly chart data, contact info) and
`src/data/faqs.js` (FAQ categories/questions).

## Team page — content sourcing note

The four team members' bios (Akshay Mehra, Bikash Saha, Wai Leong Wan,
Shantanu Mukerji) are **real**, pulled from the live crowd-genie.com/theTeam
page's hover-reveal detail (the credentials were already present in that
page's DOM, just visually hidden until hover). They are not placeholder
copy. If you need to update them, treat `src/data/content.js`'s `TEAM` array
as the source of truth going forward — don't regenerate from scratch.

The Team page went through three visual iterations before landing on the
current one:
1. Short one-line bios in a 4-column grid (original placeholder copy).
2. Full bullet-point credential lists in a 2-column grid — felt like "a
   resume dump," not a redesign.
3. **Current**: large avatar as the visual anchor at the top of each card,
   prominent serif name/role, 2–3 scannable credential "chips" (pill
   badges), then a short flowing bio paragraph below a divider. This is the
   version to keep building on — the person should read as the focal point,
   the credentials should be scannable at a glance, and the bio should read
   like prose, not a list.

## Known-good fixes worth knowing about (so they aren't reverted by accident)

- **`.btn-light`** (`Button.css`) uses `--deep-surface-2` for text color, not
  `--purple-700` — intentional, see design-system note above.
- **Ticker divider lines** (`Home.css`, `.ticker-grid::before`) use a single
  `repeating-linear-gradient` overlay instead of per-cell `border-left`,
  because `border-left` on `1fr` grid columns at non-integer pixel widths
  renders as a doubled/blurry hairline in Chromium.
- **Team/FAQs hero headings**: left-aligned via being *plain* `.wrap`
  elements with `max-width` applied only to the heading text (e.g.
  `.team-hero h1 { max-width: 20ch; }`), **not** via `margin-left: 0` on the
  outer wrap — that was tried first and it broke alignment (pinned the box
  to the literal viewport edge instead of the same centered position every
  other `.wrap` element uses).

## Running it

```
npm install
npm run dev      # Vite dev server, default port 5173
npm run build
npm run lint      # oxlint
```

No backend — forms (`Contact.jsx`, `SignUp.jsx`) simulate submission with a
`setTimeout` and client-side validation only. This is a design/frontend
prototype, not a connected product.
