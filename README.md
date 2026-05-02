# Auto Carz

Full-stack car accessories platform with a Vite React frontend and an Express/MongoDB backend.

## Structure

- `frontend` - customer-facing website and admin dashboard
- `backend` - REST API, JWT auth, MongoDB models, uploads, and seed data

## Local Setup

1. Copy `backend/.env.example` to `backend/.env`
2. Copy `frontend/.env.example` to `frontend/.env`
3. Install dependencies:
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
4. Seed the database:
   - `npm run seed --prefix backend`
5. Start both apps in separate terminals:
   - `npm run dev --prefix backend`
   - `npm run dev --prefix frontend`

## Admin Login

Use the seeded credentials from `backend/.env`:

- Email: `ADMIN_EMAIL`
- Password: `ADMIN_PASSWORD`

## Deployment

### Frontend on Vercel

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` to your deployed backend API, for example `https://your-api.onrender.com/api`

### Backend on Render

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables from `backend/.env.example`
- `render.yaml` is included as a starting point

## Features

- Premium responsive storefront with product browsing and inquiry flows
- Product search and category filtering
- Product detail pages with inquiry submission
- Services, about, contact, and reviews pages
- JWT-protected admin login
- Admin stats plus CRUD for categories, products, reviews, and inquiry status
- Local uploads fallback with Cloudinary-ready configuration
