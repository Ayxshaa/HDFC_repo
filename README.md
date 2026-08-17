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

No backend is required — the portal is a static frontend that builds and
displays the full trackable URL directly.

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

The base URL lives in `src/lib/constants.js` (`CAMPAIGN_BASE_URL`). The
**Copy Link** / **Share Link** buttons use this full trackable URL directly —
no shortening step.
