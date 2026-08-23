# Jeffrey Perona Boyce — Personal Landing Page

A single-page personal landing page for Jeffrey Perona Boyce, AI Product Designer.

---

## Project Structure

```
jeffrey-perona-boyce-site/
├── index.html       # Main landing page
├── favicon.ico      # Favicon (add your own)
└── README.md        # This file
```

---

## Stack

- Pure HTML + CSS + vanilla JavaScript — no frameworks, no build step
- Fonts loaded from Google Fonts:
  - **Staatliches** — used for the large name and role title
  - **Archivo Narrow Bold** — used for all other text and the button

---

## Features

- Full-viewport centered layout with two-column grid
- Animated entry transitions (slide in from left/right, stagger fade)
- Green banner at the top linking to talktoclyde.ai
- Portfolio pill button as primary CTA (links to Figma deck, password protected)
- Company list with hover shimmer effect
- Fixed footer with:
  - Resume, LinkedIn, and email links
  - Dynamic date line (current month + year, generated via JS)
- Email address assembled in JavaScript to prevent Cloudflare obfuscation
- Fully responsive — stacks to single column on mobile, footer flows below content

---

## Links

| Label | URL |
|---|---|
| Portfolio | https://www.figma.com/deck/YZMn3t9dZ5yl1WTsu4Dxr1 |
| Resume | https://raw.githubusercontent.com/jeffreyboyce-byte/portfolio/main/jeffrey-perona-boyce-resume.pdf |
| LinkedIn | https://linkedin.com/in/jeffreyperonaboyce |
| Clyde AI | https://talktoclyde.ai |
| Email | hello@jeffreyperonaboyce.com |

---

## Local Development

No build tools needed. Just open `index.html` in any browser:

```bash
open index.html
```

Or use VS Code with the **Live Server** extension for hot reload at `localhost:5500`.

---

## To Do

- [ ] Add `favicon.ico`
- [ ] Deploy to custom domain (jeffreyperonaboyce.com)
- [ ] Add Open Graph meta tags for link previews
- [ ] Consider adding a case study section below the fold
