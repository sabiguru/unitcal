# 📧 A2 Hosting Email Setup for Calculator Fort

Your email system is now configured for A2 Hosting! Here's what you need to complete the setup:

## ✅ What's Already Configured

- **SMTP Host**: `nl1-ss17.a2hosting.com` 
- **SMTP Port**: `587` (TLS)
- **From Email**: `noreply@calcfort.com`
- **From Name**: `Calculator Fort`

## 🔑 What You Need to Add

**Just update your `.env` file with the password:**

```bash
SMTP_PASS="your-actual-email-password"
```

Replace `your-email-password-here` with the password for your `noreply@calcfort.com` email account.

## 📬 Setting Up the Email Account

### 1. Create the Email Account (if not exists)

In your A2 Hosting cPanel:
1. Go to **Email** → **Email Accounts**
2. Click **Create**
3. Create: `noreply@calcfort.com`
4. Set a strong password
5. Update the `.env` file with this password

### 2. Alternative Email Options

You can also use any existing email on your domain:
- `admin@calcfort.com`
- `support@calcfort.com` 
- `hello@calcfort.com`

Just update both `SMTP_USER` and `SMTP_FROM_EMAIL` in `.env` to match.

## 🧪 Test the Setup

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Email Sending
```bash
curl -X POST http://localhost:3001/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "your-personal@email.com", "type": "signup"}'
```

### 3. Check the Response
You should see:
```json
{
  "success": true,
  "message": "Test email sent successfully", 
  "connectionTest": true,
  "emailSent": true
}
```

## 🚀 Ready to Go!

Once the password is set, your verification emails will work automatically:

- **Signup**: Users get a welcome email with verification code
- **Login**: Users get a sign-in verification email
- **Professional Design**: Calculator Fort branded templates
- **Security**: 15-minute expiry, proper warnings

## 🔧 Troubleshooting

### If emails don't send:
1. **Check Password**: Verify the email account password is correct
2. **Check Account**: Ensure `noreply@calcfort.com` exists in cPanel
3. **Check Logs**: Look at console output for error messages
4. **Test Connection**: Use the test endpoint to verify SMTP connection

### Common A2 Hosting Notes:
- A2 Hosting automatically opens ports 587/465 ✅
- No additional firewall configuration needed ✅
- SMTP authentication is required (username/password) ✅

## 📊 Next Steps

1. **Set the email password** in `.env`
2. **Test with the API endpoint** above
3. **Try signing up** with a real email address
4. **Check your inbox** for the verification code!

---

**Your email system is ready to go live! 🎉**