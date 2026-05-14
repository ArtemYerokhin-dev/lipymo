# Lipymo

Landing page for a small homemade food delivery in Kyiv. Dumplings, borscht, cutlets — made by hand every morning and delivered as semi-prepared meals with cooking instructions.

Built with React, Vite and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Project structure

```
src/
├── App.jsx              # Root component, handles routing between pages
├── main.jsx             # Entry point
├── index.css            # CSS variables, cursor, animations
│
├── assets/data/
│   ├── products.js      # All dishes: name, price, ingredients, photos
│   ├── reviews.js       # Reviews and rating
│   └── content.js       # All site text by section
│
└── components/
    ├── Nav.jsx           # Navigation with mobile menu
    ├── Hero.jsx          # Main screen
    ├── Catalog.jsx       # Horizontal scroll catalog with filters
    ├── CatalogPage.jsx   # Full catalog page (grid layout)
    ├── ProductModal.jsx  # Dish detail modal
    ├── CartDrawer.jsx    # Cart sidebar
    ├── CheckoutPage.jsx  # Order form with promo code and payment
    ├── Story.jsx         # About us
    ├── HowItWorks.jsx    # How ordering works
    ├── Promo.jsx         # Discount promo block
    ├── Reviews.jsx       # Reviews carousel and submit form
    ├── Footer.jsx        # Footer
    └── Cursor.jsx        # Custom cursor (hidden on touch devices)
```

## Making changes

**Edit text** — everything is in `src/assets/data/content.js`, one object per section.

**Add or edit a dish** — open `src/assets/data/products.js` and add an object following the same shape as the existing ones.

**Change colors** — `tailwind.config.js` under `theme.extend.colors`. CSS variables are in `src/index.css`.

**Replace photos** — update `image` and `thumb` fields in `products.js`:
```js
image: '/src/assets/images/varenyky.jpg',
thumb: '/src/assets/images/varenyky-sm.jpg',
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview the build locally |
