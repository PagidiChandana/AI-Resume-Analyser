# AI Resume Analyzer Frontend

Modern React + Vite frontend for the AI Resume Analyzer MERN project.

## Features

- Responsive landing page
- Login and registration with JWT storage
- Protected dashboard routes and admin-only routes
- Drag-and-drop resume uploads with progress and PDF preview
- AI analysis reports with ATS score charts
- Strengths, weaknesses, suggestions, skill gap analysis, job recommendations, and interview question views
- PDF export with `jsPDF` and `html2canvas`
- Dark/light mode
- Toast notifications, loading states, empty states, charts, and reusable UI components

## Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment

```env
VITE_API_URL=http://localhost:5000
```

The frontend expects the backend API under `/api`, for example `http://localhost:5000/api/auth/login`.

## Build

```bash
npm run build
```
