# HDFC Bank — Employee Link Generation Portal

React source recovered from the deployed production bundle
(`index-bnppk6by.js` / `index-c3dh002g.css` in the parent folder).

## Stack

| Concern    | Choice                                  |
| ---------- | --------------------------------------- |
| Build      | Vite 7                                  |
| UI         | React 19                                |
| Routing    | react-router-dom 7 (`/`, `/generate`)   |
| Styling    | Tailwind CSS v4 (`@theme` tokens)       |
| Animation  | framer-motion 12                        |
| Icons      | lucide-react                            |

## Getting started

> Requires Node.js 20.19+ (or 22.12+). It is **not** currently installed on this
> machine — install it from https://nodejs.org first.

```bash
cd hdfc-link-portal
npm install
npm run dev      # http://localhost:5173 (or next free port)
npm run build    # production build in dist/
```

No backend is required — link shortening calls the public TinyURL API directly
from the browser (see [Link shortening](#link-shortening)).

## Structure

```
src/
├── App.jsx                      # routes + page transition (AnimatePresence mode="wait")
├── main.jsx                     # StrictMode > BrowserRouter > App
├── index.css                    # tailwind import, HDFC @theme tokens, keyframes, base
├── components/
│   ├── BrandHeader.jsx          # sticky navy masthead (slides down on mount)
│   ├── BrandFooter.jsx          # 4px navy/red brand rule
│   ├── PageShell.jsx            # header + scrollable main + footer
│   ├── PageTransition.jsx       # route slide/fade wrapper
│   ├── StepIndicator.jsx        # 4-step journey breadcrumb
│   ├── EmployeeDetailsForm.jsx  # name / code / branch capture + validation
│   └── GeneratedLinkCard.jsx    # success state, copy + Web Share
├── hooks/useCopyToClipboard.js  # clipboard write + 2s "Copied!" flag
├── lib/constants.js             # routes, steps, fields, campaign base URL
├── lib/trackableLink.js         # URL builder + form validation
└── pages/
    ├── PortalHomePage.jsx       # banner, hero, portal card CTA
    └── GenerateLinkPage.jsx     # form ⇄ generated-link state machine
```

`server/` contains an earlier self-hosted Express shortener (nanoid code + JSON-file
store + redirect) kept for reference. It's currently unused — the app calls TinyURL
directly instead — but is a drop-in swap if you want a branded/self-hosted short
domain later: point `src/lib/shortenLink.js` at `POST /api/shorten` on that server.

## Design tokens (`src/index.css`)

| Token                     | Value     |
| ------------------------- | --------- |
| `--color-hdfc-navy`       | `#003087` |
| `--color-hdfc-navy-dark`  | `#001e5c` |
| `--color-hdfc-red`        | `#ed232a` |
| `--color-hdfc-bg`         | `#f5f7fb` |
| `--color-hdfc-blue-50`    | `#eef2fb` |
| `--color-hdfc-blue-100`   | `#dbe4f7` |

Font: **IBM Plex Sans** (loaded from Google Fonts in `index.html`).
Custom animations: `animate-float` (6s ease-in-out) and `animate-pulse-ring` (2.2s).

## Generated link format

```
https://campaign.com/experience?employee_code=<code>&branch_code=<branch>&employee_name=<name>
```

The base URL lives in `src/lib/constants.js` (`CAMPAIGN_BASE_URL`).

## Link shortening

The full tracking URL (with UTM + LGCode/BCode/BRCode/LCCode params) is what
actually gets attribution, but it's long and unfriendly to share. On generation,
`src/lib/shortenLink.js` calls the public da.gd shortener API
(`https://da.gd/shorten?url=<encoded>`) directly from the browser — it responds
with `Access-Control-Allow-Origin: *`, so no backend/proxy is needed to read the
response.

da.gd was chosen over TinyURL/v.gd specifically because it 302-redirects straight
to the destination with **no "are you sure you want to continue?" interstitial**
— those free shorteners show a warning page by default, which is a dealbreaker
for a customer-facing bank campaign link.

The **Copy Link** / **Share Link** buttons always use the short URL. The full
tracking URL stays visible behind a "View full tracking link" toggle on the
generated-link card for verification. If da.gd is unreachable, `shortenLink()`
falls back to the full URL so link generation never breaks.

Trade-off: da.gd is still a third-party, unbranded domain — fine for a demo, but
worth revisiting `server/` (self-hosted, own domain) before a real production
rollout to bank customers.
