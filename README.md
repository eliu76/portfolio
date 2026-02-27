# evan liu — portfolio

Personal portfolio built with Next.js 14. Clean, editorial design with an interactive terminal, animated experience timeline, and filterable project grid.

## tech stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Vanilla CSS with CSS variables (no Tailwind, no UI libraries)
- **Fonts:** Playfair Display + DM Mono + DM Sans via Google Fonts
- **Deployment:** Vercel

---

## local development

### prerequisites
- Node.js 18.17 or later
- npm / yarn / pnpm

### getting started

```bash
# 1. clone the repo
git clone https://github.com/eliu76/evan-portfolio.git
cd evan-portfolio

# 2. install dependencies
npm install

# 3. start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## project structure

```
evan-portfolio/
├── public/
│   └── resume.pdf          ← drop your resume PDF here
├── src/
│   ├── app/
│   │   ├── globals.css     ← shared CSS variables, resets, fonts
│   │   ├── layout.jsx      ← root layout + metadata/SEO
│   │   └── page.jsx        ← assembles all sections
│   └── components/
│       ├── Nav.jsx          ← fixed nav with active section tracking
│       ├── ScrollProgress.jsx ← top progress bar
│       ├── Hero.jsx         ← landing + interactive terminal
│       ├── Experience.jsx   ← work history, education, skills
│       ├── Projects.jsx     ← filterable project cards
│       └── Contact.jsx      ← contact links + footer
├── next.config.js
├── jsconfig.json
└── package.json
```

---

## deploying to vercel (recommended)

Vercel is the easiest way to deploy — it's free for personal projects and deploys directly from GitHub.

### step 1: push to github

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/evan-portfolio.git
git push -u origin main
```

### step 2: deploy on vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `evan-portfolio` repository
4. Leave all settings as default — Vercel auto-detects Next.js
5. Click **"Deploy"**

Your site will be live at `https://evan-portfolio.vercel.app` (or a custom URL).

### step 3 (optional): custom domain

1. In your Vercel project dashboard, go to **Settings → Domains**
2. Add your custom domain (e.g. `evanliu.dev`)
3. Follow the DNS instructions Vercel provides

---

## customization

All content lives directly in the component files — no CMS or external config needed.

| What to update | Where |
|---|---|
| Name, bio, taglines | `src/components/Hero.jsx` → top of file |
| Terminal commands | `src/components/Hero.jsx` → `COMMANDS` object |
| Work experience | `src/components/Experience.jsx` → `EXPERIENCE` array |
| Education | `src/components/Experience.jsx` → `EDUCATION` object |
| Skills | `src/components/Experience.jsx` → `SKILLS` array |
| Projects | `src/components/Projects.jsx` → `PROJECTS` array |
| Contact links | `src/components/Contact.jsx` → `links` array |
| SEO metadata | `src/app/layout.jsx` → `metadata` export |
| Color palette | `src/app/globals.css` → `:root` CSS variables |

---

## license

MIT — feel free to fork and make it your own.
