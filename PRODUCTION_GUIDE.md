# Production Deployment Guide - AI Resume Analyzer

## Overview
This guide covers the production-ready setup for the AI Resume Analyzer application (MERN stack: MongoDB, Express, React, Node.js).

## ✅ Production-Ready Checklist

### Security Enhancements ✓
- [x] **CORS Configuration**: Implemented dynamic CORS with origin validation instead of wildcard "*"
- [x] **Security Headers**: Added X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, HSTS headers
- [x] **Credentials Protection**: Removed .env files from git tracking (git rm --cached)
- [x] **Environment Variables**: Proper NODE_ENV configuration for production
- [x] **JWT Authentication**: Token-based authentication with Bearer scheme support
- [x] **Password Hashing**: bcryptjs for secure password storage
- [x] **Error Handling**: Error middleware with stack trace hiding in production

### Code Quality & Dependencies ✓
- [x] **Package Installation**: All dependencies installed (149 backend packages, 226 frontend packages)
- [x] **No Vulnerabilities**: 0 vulnerabilities found after npm audit
- [x] **Peer Dependency Handling**: .npmrc configured with legacy-peer-deps for cloudinary compatibility
- [x] **Build Optimization**: Vite configured with source map disabled, terser minification, vendor chunking

### Configuration Files ✓
- [x] **.env.example**: Comprehensive template with all required variables
- [x] **.gitignore**: Updated to exclude sensitive files (.env, node_modules, dist/, logs)
- [x] **.npmrc**: Configured for production builds

---

## 🚀 Deployment Instructions

### Backend Deployment (Node.js + Express)

#### Prerequisites
- Node.js >= 18.0.0
- MongoDB cluster URL
- API Keys (Cloudinary, Gemini)
- Email credentials (Gmail App Password)

#### Environment Variables Setup
Create a `.env` file in the `backend/` directory:

```
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-domain.com,https://www.your-frontend-domain.com

# Database
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-analyzer

# JWT (Use a strong random string)
JWT_SECRET=your-secure-jwt-secret-here-min-32-characters

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Gemini API
GEMINI_API_KEY=your-gemini-api-key

# Email
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

#### Build & Run
```bash
cd backend

# Install dependencies
npm install --legacy-peer-deps

# Start production server
npm start

# Or use process manager (recommended for production)
npm install -g pm2
pm2 start src/index.js --name "ai-resume-analyzer"
pm2 save
pm2 startup
```

#### Docker Alternative
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

---

### Frontend Deployment (React + Vite)

#### Prerequisites
- Node.js >= 18.0.0
- Backend API URL

#### Environment Variables Setup
Create a `.env.production` file in the `frontend/` directory:

```
VITE_API_URL=https://your-backend-domain.com
```

#### Build Process
```bash
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# This creates optimized files in the 'dist/' folder
```

#### Deployment Options

**Option 1: Vercel (Recommended)**
```bash
npm install -g vercel
vercel
# Follow prompts, set VITE_API_URL environment variable
```

**Option 2: Netlify**
- Connect GitHub repository
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variables: `VITE_API_URL=your-backend-url`

**Option 3: Self-Hosted (Nginx)**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/ai-resume-analyzer/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass https://your-backend-domain.com/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🔒 Security Best Practices

### 1. CORS Configuration
- ✅ Dynamic origin validation (not wildcard)
- ✅ Credentials support enabled
- ✅ Allowed methods: GET, POST, PUT, DELETE, PATCH
- ✅ Specific headers whitelisted

### 2. Environment Variables
- ✅ Never commit .env files
- ✅ Use strong JWT secrets (min 32 characters)
- ✅ Use app-specific passwords for Gmail
- ✅ Keep API keys private and rotated

### 3. API Security
- ✅ JWT token validation on protected routes
- ✅ Admin-only routes with role checking
- ✅ Request size limits (2MB JSON, 2MB URL-encoded)
- ✅ Error messages don't expose stack traces in production

### 4. HTTP Security Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## 📊 Monitoring & Performance

### Recommended Monitoring Tools
- **PM2 Plus**: Process monitoring and logging
- **New Relic**: APM (Application Performance Monitoring)
- **Sentry**: Error tracking
- **CloudFlare**: CDN and DDoS protection

### Performance Optimization
- ✅ Frontend: Code splitting, lazy loading, minification
- ✅ Backend: Request compression, connection pooling
- ✅ Database: Proper indexing, query optimization
- ✅ Caching: Client-side caching, Redis for session management

### Database Optimization
```javascript
// Recommended MongoDB indexes for common queries
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });
db.resumes.createIndex({ userId: 1 });
db.analysis.createIndex({ userId: 1, createdAt: -1 });
```

---

## 🧪 Testing Before Production

### Backend Testing
```bash
cd backend

# Run basic server startup test
npm start

# Test API endpoints
curl http://localhost:5000/
```

### Frontend Testing
```bash
cd frontend

# Development server test
npm run dev

# Production build test
npm run build
npm run preview
```

### Critical Endpoints to Test
- [x] POST `/api/auth/register` - User registration
- [x] POST `/api/auth/login` - User login
- [x] POST `/api/upload` - Resume upload
- [x] POST `/api/analysis/analyze` - Resume analysis
- [x] GET `/api/history` - Get user's analysis history
- [x] GET `/api/admin/stats` - Admin dashboard (admin only)

---

## 🚨 Troubleshooting

### CORS Errors
**Problem**: "Access to XMLHttpRequest blocked by CORS policy"
**Solution**: 
- Verify CLIENT_URL matches your frontend domain exactly
- Check for trailing slashes in URLs
- Restart backend after changing CLIENT_URL

### Dependency Conflicts
**Problem**: "npm error ERESOLVE could not resolve"
**Solution**: Use `npm install --legacy-peer-deps` (already configured in .npmrc)

### Database Connection Issues
**Problem**: "MongooseError: Cannot connect to MongoDB"
**Solution**:
- Verify DB_URL is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user credentials are correct

### JWT Authentication Failures
**Problem**: "Not authorized, token failed"
**Solution**:
- Verify JWT_SECRET is the same across deployments
- Check token expiration time
- Clear localStorage and re-login

---

## 📝 Environment Checklist for Production

- [ ] All .env variables configured
- [ ] NODE_ENV set to "production"
- [ ] Database credentials verified
- [ ] API keys (Cloudinary, Gemini) active
- [ ] Email credentials working (test send)
- [ ] Frontend build passes (`npm run build`)
- [ ] SSL/HTTPS certificate installed
- [ ] CORS CLIENT_URL updated
- [ ] Backup strategy implemented
- [ ] Monitoring tools configured
- [ ] Error logging enabled
- [ ] Database backups scheduled

---

## 📞 Support & Contact

For issues or questions:
- GitHub: https://github.com/PagidiChandana/AI-Resume-Analyser
- Create issues for bug reports
- Check DEPLOYMENT.md for additional details

---

**Last Updated**: May 26, 2026  
**Version**: 1.0.0 (Production-Ready)
