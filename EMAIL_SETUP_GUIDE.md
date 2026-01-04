# 📧 Email Configuration Guide for Calculator Fort

This guide will help you set up email sending for verification codes in your Calculator Fort application.

## 🏗️ What's Already Implemented

✅ **Email Service Library** (`src/lib/email.ts`)
- Professional HTML email templates for login and signup
- Fallback text versions for all emails  
- Secure SMTP configuration handling
- Development mode console logging when email isn't configured

✅ **Email Templates**
- **Signup Email**: Welcome message with verification code
- **Login Email**: Sign-in verification code  
- Modern, responsive design with Calculator Fort branding
- Security notices and expiry warnings

✅ **API Integration**
- Updated `/api/auth/send-verification` to use email service
- Graceful fallback to console logging in development
- Test endpoint at `/api/test-email` (development only)

## 🔧 Configuration Steps

### 1. Get SMTP Details from Your Web Host

Contact your web hosting provider or check your control panel for:

```bash
SMTP_HOST=          # e.g., mail.yourdomain.com, smtp.gmail.com
SMTP_PORT=          # Usually 587 (TLS) or 465 (SSL)  
SMTP_SECURE=        # "false" for port 587, "true" for port 465
SMTP_USER=          # Your email username/address
SMTP_PASS=          # Your email password or app-specific password
SMTP_FROM_EMAIL=    # The email address to send from
SMTP_FROM_NAME=     # Display name (e.g., "Calculator Fort")
```

### 2. Update Your .env File

Uncomment and fill in the email configuration in your `.env` file:

```bash
# Email Service Configuration
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="your-email-password"
SMTP_FROM_EMAIL="noreply@yourdomain.com"  
SMTP_FROM_NAME="Calculator Fort"
```

### 3. Install Dependencies

```bash
npm install nodemailer @types/nodemailer
```

*(Already added to package.json)*

### 4. Test Email Configuration

Use the test endpoint to verify your setup:

```bash
# Test signup email
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "your-test@email.com", "type": "signup"}'

# Test login email  
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "your-test@email.com", "type": "login"}'
```

## 🌐 Common Web Host Configurations

### cPanel/Shared Hosting
```bash
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="your-email-password"
```

### Gmail/Google Workspace
```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"  # Use App Password, not regular password
```

### SendGrid
```bash
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
```

### Mailgun
```bash
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="postmaster@your-domain.mailgun.org"
SMTP_PASS="your-mailgun-smtp-password"
```

## 🔒 Security Best Practices

1. **Use App Passwords**: For Gmail/Google, generate an app-specific password
2. **Dedicated Email**: Create a dedicated email like `noreply@yourdomain.com`  
3. **Environment Variables**: Never commit SMTP credentials to version control
4. **Rate Limiting**: Consider implementing rate limiting for verification emails
5. **SPF/DKIM**: Configure proper email authentication records

## 🧪 Testing & Troubleshooting

### Development Mode
- When SMTP is not configured, codes are logged to console
- Response includes `developmentCode` field for testing
- Test endpoint available at `/api/test-email`

### Common Issues

**Connection Refused**
- Check SMTP host and port
- Verify firewall/security settings
- Try port 465 with `SMTP_SECURE="true"`

**Authentication Failed**  
- Verify username and password
- For Gmail: use app-specific password
- Check if 2FA is enabled

**Emails Going to Spam**
- Configure SPF, DKIM, and DMARC records
- Use a professional sending domain
- Include proper unsubscribe headers

### Debug Commands

```bash
# Check email service status
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "type": "signup"}'

# Monitor server logs
npm run dev
# Look for email-related console logs
```

## 📱 Email Features

### Signup Email
- Welcome message with branding
- Large, clear verification code
- Security tips for new users
- Professional design with Calculator Fort logo

### Login Email  
- Quick sign-in verification
- Prominent verification code display
- Security notice about unauthorized access
- Consistent branding

### Both Templates Include
- 15-minute expiry notice
- Responsive design for mobile/desktop
- Professional Calculator Fort branding
- Security warnings and tips
- Plain text fallback versions

## 🚀 Production Deployment

1. **Update Environment Variables** in your production hosting
2. **Test Email Delivery** in staging environment  
3. **Monitor Email Logs** for delivery issues
4. **Set up Email Analytics** (optional)
5. **Configure Email Reputation** monitoring

## 📞 Support

If you encounter issues:
1. Check your web host's SMTP documentation
2. Test with a simple email client first
3. Verify DNS settings for your domain
4. Contact your hosting provider's support

---

**Ready to go live?** Once you've configured the SMTP settings, your verification emails will be sent automatically for all new signups and logins!