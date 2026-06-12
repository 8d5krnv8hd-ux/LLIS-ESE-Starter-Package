# LLIS European Section Guide

**Lënster Lycée International School** — Secondary Education Guide S1–S7 and FAQ, published via GitHub Pages.

## Pages

| Page | URL | Description |
|---|---|---|
| S1–S7 Guide | `/` | Full curriculum guide for families |
| FAQ | `/faq.html` | 23 frequently asked questions |

## Structure

```
llis-european-guide/
├── index.html              # S1–S7 Guide
├── faq.html                # FAQ page
├── assets/
│   ├── css/
│   │   ├── guide.css       # Styles for the guide
│   │   └── faq.css         # Styles for the FAQ
│   ├── js/
│   │   ├── guide.js        # Scroll reveal + nav scroll-spy
│   │   └── faq.js          # Accordion + search + filters
│   └── images/
│       ├── logo.png        # LLIS logo (white, transparent bg)
│       └── campus.jpg      # Hero background photo
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages auto-deploy
└── README.md
```

## Publish to GitHub Pages

### 1. Create a new repository on GitHub

Go to [github.com/new](https://github.com/new) and create a repository named e.g. `llis-european-guide`.

### 2. Push this project

```bash
cd llis-european-guide
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/llis-european-guide.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` will run automatically on every push to `main`
4. Your site will be live at `https://YOUR-USERNAME.github.io/llis-european-guide/`

### 4. Custom domain (optional)

To use a custom domain like `guide.llis.lu`:

1. Add a `CNAME` file to the repo root containing your domain:
   ```
   guide.llis.lu
   ```
2. In your DNS provider, add a `CNAME` record pointing `guide` → `YOUR-USERNAME.github.io`
3. In GitHub → Settings → Pages → Custom domain, enter `guide.llis.lu`
4. Enable **Enforce HTTPS**

## Design System

Built on the **LLIS Brand Tokens v2.0**:

- **Primary:** Midnight `#1E3A5F` · Steel `#2D5282`
- **Secondary:** Sage `#C8DDB5` · Fern `#5A8A5A` · Terracotta `#C85A4A` · Blush `#E8A090` · Amber `#E8A830`
- **Font:** Gill Sans MT → Gill Sans → Nunito (Google Fonts fallback)
- **Mono:** Source Code Pro (for codes, IDs)

## Editing content

All content is in plain HTML. The most common edits:

- **Update a FAQ answer:** Find the `<div class="faq-a-body">` inside the relevant `.faq-item` in `faq.html`
- **Update curriculum tables:** Find the relevant `<table>` in `index.html` inside `#tab-s1s3`, `#tab-s4s5` or `#tab-s6s7`
- **Update the welcome text:** Find `.hero-welcome` in `index.html`
- **Replace the campus photo:** Swap out `assets/images/campus.jpg` (recommended: 1600×900px, JPEG, ~150KB)
- **Replace the logo:** Swap out `assets/images/logo.png` (transparent background, ~200px height)

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). No build step required — pure HTML, CSS and vanilla JS.
