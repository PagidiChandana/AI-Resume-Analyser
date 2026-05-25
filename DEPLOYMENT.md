# Production Deployment Guide

## Pre-Deployment Checklist

### Security
- [x] `.env` files added to `.gitignore`
- [x] `.env.example` created with required variables
- [ ] All API keys rotated/regenerated before production
- [ ] Verify no sensitive data in code

### Backend (Render)
1. **Prepare Environment Variables**
   - Create a new `.env` file with production values
   - MongoDB Atlas URI (cloud database)
   - New JWT_SECRET (strong random value)
   - Verified Cloudinary, Gemini, and Email credentials
   - Set `CLIENT_URL` to your Vercel frontend URL
   - Set `NODE_ENV=production`

2. **Deploy to Render**
   ```bash
   # Push code to GitHub
   git add .
   git commit -m "Production ready"
   git push origin main
   ```
   
   In Render Dashboard:
   - New → Web Service
   - Connect GitHub repository
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment Variables: Add all from `.env.example`
   - Node version: >=18.0.0

3. **Verify Deployment**
   - Test API health: `https://your-render-url/api`
   - Check database connection
   - Test authentication endpoints

### Frontend (Vercel)
1. **Prepare Environment Variables**
   - Set `VITE_API_URL` to your Render backend URL
   - Example: `https://your-backend.onrender.com`

2. **Deploy to Vercel**
   ```bash
   npm run build  # Test build locally
   ```
   
   In Vercel Dashboard:
   - Import project from GitHub
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment Variables:
     - `VITE_API_URL=https://your-backend.onrender.com`

3. **Verify Deployment**
   - Test frontend loads
   - Test authentication flow
   - Test API communication with backend

## Post-Deployment

### Monitoring
- [ ] Monitor error logs in Render dashboard
- [ ] Monitor frontend errors in Vercel Analytics
- [ ] Set up alerts for downtime

### Database
- [ ] Enable MongoDB backups
- [ ] Configure connection pooling for performance
- [ ] Monitor database metrics

### Performance
- [ ] Test API response times
- [ ] Verify frontend bundle size
- [ ] Check image optimization on Cloudinary

## Important Notes

1. **Secrets Management**
   - Never commit `.env` files to Git
   - Rotate API keys periodically
   - Use platform-specific secret managers (Render/Vercel environment variables)

2. **CORS Configuration**
   - Verify `CLIENT_URL` matches your Vercel domain exactly
   - Test cross-origin requests

3. **Database Connection**
   - Use MongoDB Atlas (cloud) for production
   - Enable IP whitelisting in MongoDB Atlas
   - Consider connection pooling

4. **Email Service**
   - Use Gmail App Password (not regular password)
   - Enable less secure app access if needed
   - Consider SendGrid/Mailgun for higher volume

## Rollback Procedure

If issues occur:
1. Check logs in Render/Vercel dashboards
2. Revert to previous commit on GitHub
3. Redeploy from Render/Vercel dashboards
