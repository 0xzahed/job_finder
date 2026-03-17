# QuickHire - Mini Job Board

QuickHire is a mini job board app built with **Next.js** (App Router) and a SQLite-backed API.

It includes:
- Public landing page (QuickHire design-inspired UI)
- Jobs listing page with search/filter
- Job details page
- Apply form
- Basic admin page to create/delete jobs
- REST API endpoints for jobs and applications

## Tech Stack

- Next.js 16 (React 19)
- Tailwind CSS 4
- Node.js built-in `node:sqlite` (SQLite)

## Project Structure

```text
src/
  app/
    page.jsx                 # Landing page
    jobs/page.jsx            # Job listing/search/filter
    jobs/[id]/page.jsx       # Job detail + apply form
    admin/page.jsx           # Admin create/delete jobs
    api/jobs/route.js        # GET, POST jobs
    api/jobs/[id]/route.js   # GET, DELETE single job
    api/applications/route.js# POST application
  components/
    jobs/
      JobCard.jsx
      JobFilters.jsx
      ApplyForm.jsx
      AdminJobForm.jsx
      AdminJobsTable.jsx
  lib/
    db.js                    # DB schema + CRUD helpers + seed
    validation.js            # Input validation
    formatters.js            # UI formatting helpers
```

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open: `http://localhost:3000`

## Environment Variables (Optional)

Create `.env.local` if you want a custom DB path:

```bash
DATABASE_PATH=./data/quickhire.db
```

If not set, app uses `data/quickhire.db` by default.

## API Endpoints

### Jobs

- `GET /api/jobs`
  - Optional query params: `q`, `category`, `location`
- `GET /api/jobs/{id}`
- `POST /api/jobs`
  - Required body:
    - `title`
    - `company`
    - `location`
    - `category`
    - `description`
- `DELETE /api/jobs/{id}`

### Applications

- `POST /api/applications`
  - Required body:
    - `job_id`
    - `name`
    - `email`
    - `resume_link`
    - `cover_note`

## Validation Rules

- Required fields are validated for all create endpoints.
- Email must match valid email format.
- Resume link must be a valid HTTP/HTTPS URL.
- Job description must be at least 20 characters.

## Admin Flow

Go to: `http://localhost:3000/admin`

- Create a job
- See all jobs
- Delete any job

## Candidate Flow

1. Browse jobs at `/jobs`
2. Search/filter listings
3. Open details page `/jobs/{id}`
4. Submit application form

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Notes

- Initial sample jobs are seeded automatically on first run.
- SQLite `node:sqlite` is currently experimental in Node, but works for this assessment setup.
