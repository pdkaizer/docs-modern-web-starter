# Modern Web Starter — Docs

Documentation site for [Modern Web Starter](https://github.com/pdkaizer/modern-web-starter), a lean, no-framework HTML/CSS foundation built around four modern CSS concepts.

## What's covered

| Section | Topic |
|---|---|
| [Cascade Layers](layers.html) | Layer-based specificity management — no more `!important` wars |
| [Design Tokens](tokens.html) | Three-tier token hierarchy: primitives → semantic → component |
| [Dark Mode](dark-mode.html) | Theme switching as a token concern, not a component concern |
| [Container Queries](container-queries.html) | Components that respond to their container, not the viewport |

## Getting started

No build step required for development.

```bash
# Clone the repo
git clone https://github.com/pdkaizer/modern-web-starter.git
cd modern-web-starter

# Open directly in browser
open index.html

# Or use a local server
npx serve .
```

For production, bundle with Vite + PostCSS:

```bash
npm install -D vite postcss postcss-import postcss-nesting
npx vite build
```

## File structure

```
/
├── index.html              # Overview + quick start
├── layers.html             # Cascade Layers guide
├── tokens.html             # Design Tokens guide
├── dark-mode.html          # Dark Mode guide
├── container-queries.html  # Container Queries guide
├── css/
│   ├── main.css            # Entry point — @layer order + @imports
│   ├── tokens.css          # All design tokens (T1 → T2 → T3)
│   ├── reset.css           # Browser normalisation
│   ├── base.css            # Element-level defaults
│   ├── components.css      # Reusable UI patterns
│   ├── utilities.css       # Single-purpose helpers
│   └── docs.css            # Documentation-specific styles
└── js/
    ├── main.js             # Theme toggle, mobile nav, scroll reveal
    └── docs.js             # Docs shell interactions
```

## Browser support

All features have broad modern browser support:

| Feature | Chrome | Firefox | Safari |
|---|---|---|---|
| CSS Cascade Layers | 99 | 97 | 15.4 |
| CSS Custom Properties | 49 | 31 | 9.1 |
| Container Queries | 105 | 110 | 16 |
| `color-mix()` | 111 | 113 | 16.2 |
| `clamp()` | 79 | 75 | 13.1 |
