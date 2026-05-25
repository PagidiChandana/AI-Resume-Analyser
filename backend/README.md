# AI Resume Analyzer Backend

Production-ready Express/MongoDB backend for a MERN stack AI Resume Analyzer.

## Features

- JWT authentication with hashed passwords
- Protected user APIs and admin-only APIs
- Resume upload to Cloudinary with Multer
- Gemini-powered resume analysis
- ATS score breakdown
- Strengths, weaknesses, suggestions, skill gap analysis, and job recommendations
- Interview question generation
- Resume analysis history and score comparison
- Email report delivery through Gmail App Passwords
- Centralized error handling and reusable validation middleware

## Setup

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create `.env` in `backend/`.

```env
PORT=5000
DB_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=
```

## API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Uploads

- `POST /api/upload/resume`
- `GET /api/upload/resumes`

Use multipart form-data with field name `resume`.

### Analysis

- `POST /api/analysis`
- `GET /api/analysis/:id`
- `POST /api/analysis/skill-gap`
- `POST /api/analysis/job-recommendations`

### Interview

- `POST /api/interview/questions`

### History

- `GET /api/history`
- `GET /api/history/compare`
- `GET /api/history/:id`

### Admin

- `GET /api/admin/users`
- `DELETE /api/admin/users/:id`
- `GET /api/admin/uploads`
- `GET /api/admin/statistics`
- `GET /api/admin/analysis-count`

Admin routes require a JWT from a user whose `role` is `admin`.

## Notes

- Gemini receives the Cloudinary resume URL and returns structured JSON.
- Gmail email sending requires an app password, not the regular Gmail password.
- For production, set a strong `JWT_SECRET`, a restricted `CLIENT_URL`, and real credentials for MongoDB, Cloudinary, Gemini, and email.
