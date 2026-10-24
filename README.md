# Meridiano

A concept site for a private watch cabinet on the Ilha de Luanda. Rebuilt as an editorial boutique: eight objects shown as a printed cabinet, a working dial, an atelier appointment flow, and a viewing request sheet.

Meridiano is fictional. It is not an authorised dealer, no watch is for sale through this site, and the request flow prepares a note for the visitor to copy; nothing is sent, ordered or charged. The interface says so in the visit and booking sections.

## Run it

There is no build step. Serve the folder over HTTP so the relative assets and dial scripts load as a site:

```bash
npx serve .        # or: python -m http.server 5178
```

Open the printed address, or `http://localhost:5178` with the command above. The project is plain HTML, CSS and JavaScript; no package manager, bundler or framework.

## What is in the site

- **The cabinet** — eight watches with family filters (all, complications, steel, gold, high jewellery), live counts, and a card grid that opens a detail sheet with a loupe over the photograph.
- **The dial** — a working watch face and digital readout set to Africa/Luanda time, drawn in SVG and updated each second.
- **The atelier** — the appointment argument, the three-step consignment process, and a booking dialog with an object selector, date, time, name and notes.
- **The viewing request** — validation, a prepared request sheet with a reference, a copy action with manual fallback, and a reset that returns the form to its opening state.
- **Notes** — three short editorial pieces on wearing, collecting and servicing.
- **Visit** — address, hours, contact and appointment entry points.
- **Navigation** — desktop links and a full-screen menu under 860px, with focus management, Escape and scroll lock.

## Design direction

The site treats the cabinet as a printed object: paper stock, engraved rules, Bodoni Moda against Archivo, and brass used sparingly as the metal in the room. A fine grain overlays the page, and the watch photography is staged on the same paper ground.

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#edede7` | Page ground |
| Paper 2 | `#e5e2d9` | Recessed panels |
| Ink | `#14150f` | Text and rules |
| Olive | `#1d2a23` | Atelier and dark sections |
| Brass | `#9a7b48` | Hairlines, selected states, numerals |
| Signal | `#b23a26` | Errors and live accents |

Type: **Bodoni Moda** for display and the watch names, **Archivo** for text, **JetBrains Mono** for references, counts and time. Fonts are loaded from Google Fonts; the rest of the site is local. The grain, dial, loupe and the case drawings are CSS/SVG, not stock graphics.

Layout notes: an asymmetric hero with the watch staged across the fold, a numbered editorial sequence (cabinet, atelier, notes, visit), an olive atelier band, and a footer wordmark set to the page edge. Motion is limited to reveal-on-scroll, the dial hands, hover lifts and dialog entrances, and is disabled under `prefers-reduced-motion`.

## Accessibility

One `h1`; labelled form fields with errors tied through `aria-describedby`; pressed states on family filters; live regions for the result count and preparation status; native `<dialog>` with focus return, Escape and backdrop close; scroll lock; visible keyboard focus; descriptive alt text for the objects and empty alt on decorative crops; skip link.

## Assets

- `assets/` — optimised WebP photography for the watches, editorial portraits and the street scene, plus the SVG favicon.
- Photography comes from the original project archive and Unsplash; it illustrates a fictional cabinet.

`qa/` (browser captures) and `1 day project with bard/` (the original one-day build) are working folders and are ignored by git.

## Structure

```
index.html   page, dial markup, dialogs
styles.css   tokens, layout, motion
app.js       cabinet data and filters, dial clock, loupe, dialogs, request sheet
assets/      photography and favicon
```

## Origin

The repository began as a one-day Bard experiment in the folder `1 day project with bard/`. That version used the tables-and-cards restaurant-template grammar, stock icon sets and unverified copy. The rebuild replaces it with a single editorial composition, local object photography and an honest appointment flow.
