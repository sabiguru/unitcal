# Calculator Fort - Production Deployment Instructions

## Database Setup

### Step 1: Deploy Database Schema to A2 Hosting PostgreSQL

1. Log into your A2 Hosting cPanel
2. Navigate to **PostgreSQL Databases** 
3. Access your database: `benafaco_calcfort_prod`
4. Open phpPgAdmin or your preferred PostgreSQL client
5. Run the SQL script from `database-schema.sql` to create all required tables

### Step 2: Verify Database Connection (After Deployment)

Once your application is deployed to A2 Hosting, you can test the database connection:

```bash
# On your production server, run:
node test-db-connection.js
```

This will verify:
- Database connection is working
- All tables were created correctly
- Basic read/write operations function properly

## Environment Variables for Production

Ensure your production environment has these variables set:

```bash
# Database
DATABASE_URL="postgresql://benafaco_calcfort_user:Iv8.cTCIhVLc@127.0.0.200:5432/benafaco_calcfort_prod"

# NextAuth
NEXTAUTH_URL="https://calcfort.com"
NEXTAUTH_SECRET="aGdzP0xGF3/3RtrOeQGwB6KNxAJreOuYxumihCr8X9c="

# Email Service
SMTP_HOST="nl1-ss17.a2hosting.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="noreply@calcfort.com"
SMTP_PASS="<E]D]4fPbRuSG"
SMTP_FROM_EMAIL="noreply@calcfort.com"
SMTP_FROM_NAME="Calculator Fort"
```

## Deployment Checklist

- [ ] Upload application files to A2 Hosting
- [ ] Set up environment variables in production
- [ ] Run database schema creation script in PostgreSQL
- [ ] Test database connection with `test-db-connection.js`
- [ ] Test authentication flow (signup/login)
- [ ] Verify email sending functionality

## Authentication Features Ready

✅ **Complete signup flow** with email verification  
✅ **Complete login flow** with email verification  
✅ **Email templates** with professional Calculator Fort branding  
✅ **Terms of Service** and **Privacy Policy** pages  
✅ **Social login** configuration (Google, Facebook, Twitter/X)  
✅ **Remember me** functionality (30-day sessions)  
✅ **Secure session management** with JWT tokens  
✅ **Database schema** for user management and verification codes  

## Notes

- The PostgreSQL database (127.0.0.200:5432) is only accessible from within A2 Hosting's network
- Database schema deployment must be done manually via cPanel/phpPgAdmin
- Email service is configured and tested with A2 Hosting SMTP
- All authentication endpoints are ready for production use