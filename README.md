# ILIKA SHADES — Web Application

A premium home furnishing web application showcasing luxury curtains, mattresses, pillows, carpets, and blinds.

## Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Google Chrome** (recommended — the dev server auto-opens in Chrome if installed)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase (Optional)
The app connects to a Supabase database. To enable live data, edit `js/config.js`:
```javascript
window.SUPABASE_CONFIG = {
    url: "https://your-project-id.supabase.co",
    anonKey: "your-anon-public-api-key"
};
```
> If left unconfigured, the site renders with built-in demo data so you can preview the design immediately.

### 3. Start the Development Server
```bash
npm start
```
The site launches automatically at `http://localhost:3000/` in **Google Chrome**.  
If Chrome is not installed, it falls back to your system default browser.

## Browser Launch Behavior

| Command | Behavior |
|---------|----------|
| `npm start` | Detects Chrome → opens in Chrome (or default browser) |
| `npm run dev` | Same as `npm start` |
| `npm run build` | Creates production build in `/dist` (no browser opened) |
| `npm run preview` | Previews the production build |

**How it works:** The launcher script at `scripts/start.cjs` checks common Chrome installation paths on Windows (`%LOCALAPPDATA%`, `%PROGRAMFILES%`, `%PROGRAMFILES(X86)%`). If Chrome is found, it sets the `BROWSER` environment variable to the Chrome executable path before starting Vite. If Chrome is not found, Vite opens the system default browser.

## Project Structure
```
├── index.html          # Home page
├── about.html          # About Us page
├── products.html       # Product Catalog page
├── contact.html        # Contact page
├── admin/
│   ├── login.html      # Admin login (Supabase Auth)
│   └── index.html      # Admin dashboard
├── js/
│   ├── config.js       # Supabase credentials
│   └── supabase-client.js  # API client with mock fallback
├── scripts/
│   └── start.cjs        # Chrome-detection launcher
├── vite.config.js      # Vite multi-page config
├── package.json        # npm scripts and dependencies
├── robots.txt          # Search engine directives
├── sitemap.xml         # Sitemap for SEO
└── supabase_setup.sql  # Database schema
```

## Production Build
```bash
npm run build
npm run preview
```
The compiled static assets are output to the `/dist` directory.
