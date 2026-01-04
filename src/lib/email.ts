import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private fromEmail: string;
  private fromName: string;

  constructor() {
    this.fromEmail = process.env.SMTP_FROM_EMAIL || 'noreply@calcfort.com';
    this.fromName = process.env.SMTP_FROM_NAME || 'Calculator Fort';
    this.initializeTransporter();
  }

  private initializeTransporter() {
    // Only initialize if all required env vars are present
    if (!this.isConfigured()) {
      console.warn('Email service not configured. Verification codes will be logged to console.');
      return;
    }

    const config: EmailConfig = {
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    };

    this.transporter = nodemailer.createTransport(config);
  }

  private isConfigured(): boolean {
    return !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM_EMAIL
    );
  }

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    if (!this.transporter) {
      console.log(`[EMAIL SIMULATION] Would send email to: ${options.to}`);
      console.log(`[EMAIL SIMULATION] Subject: ${options.subject}`);
      console.log(`[EMAIL SIMULATION] Content: ${options.text || 'HTML content'}`);
      return false;
    }

    try {
      const mailOptions = {
        from: `"${this.fromName}" <${this.fromEmail}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${options.to}:`, result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  async sendVerificationCode(
    email: string, 
    code: string, 
    type: 'login' | 'signup'
  ): Promise<boolean> {
    const subject = type === 'signup' 
      ? 'Welcome to Calculator Fort - Verify Your Account'
      : 'Calculator Fort - Sign In Verification Code';

    const html = this.getVerificationEmailTemplate(code, type);
    const text = this.getVerificationEmailText(code, type);

    return this.sendEmail({
      to: email,
      subject,
      html,
      text,
    });
  }

  private getVerificationEmailTemplate(code: string, type: 'login' | 'signup'): string {
    const isSignup = type === 'signup';
    const title = isSignup ? 'Verify Your Account' : 'Sign In Verification';
    const greeting = isSignup ? 'Welcome!' : 'Sign in to your account';
    const description = isSignup 
      ? 'Thank you for creating an account with us. To complete your registration, please use the verification code below:'
      : 'To sign in to your account, please use the verification code below:';

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background-color: white;
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border: 1px solid #e2e8f0;
            }
            .header {
                text-align: center;
                margin-bottom: 32px;
            }
            .brand-container {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 16px;
            }
            .brand-text-container {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
            .logo {
                display: inline-block;
                width: 48px;
                height: 48px;
                background: #475569 !important;
                background: linear-gradient(135deg, #475569 0%, #334155 100%) !important;
                border-radius: 8px;
                color: #fef3c7 !important;
                font-weight: bold;
                font-size: 20px;
                line-height: 48px;
                margin-right: 12px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                border: 2px solid #334155 !important;
            }
            .brand-text {
                font-size: 24px;
                font-weight: bold;
                color: #334155;
                margin: 0;
            }
            .tagline {
                font-size: 14px;
                color: #64748b;
                margin: 4px 0 0 0;
                font-style: italic;
                line-height: 1.2;
            }
            .title {
                font-size: 28px;
                font-weight: bold;
                color: #1a202c;
                margin: 0;
            }
            .content {
                margin-bottom: 32px;
            }
            .greeting {
                font-size: 20px;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 16px;
            }
            .description {
                font-size: 16px;
                color: #4a5568;
                margin-bottom: 24px;
            }
            .code-container {
                background: #f8fafc;
                border-radius: 12px;
                padding: 24px;
                text-align: center;
                margin: 24px 0;
                border: 2px solid #e2e8f0;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            }
            .code-label {
                color: #64748b;
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .verification-code {
                font-size: 36px;
                font-weight: 900;
                color: #1e293b;
                font-family: 'Courier New', monospace;
                letter-spacing: 8px;
                margin: 0;
                text-shadow: none;
            }
            .expiry-notice {
                background-color: #fef3c7;
                border: 1px solid #f59e0b;
                border-radius: 8px;
                padding: 12px 16px;
                margin: 24px 0;
                font-size: 14px;
                color: #92400e;
            }
            .security-notice {
                background-color: #f0f9ff;
                border: 1px solid #0ea5e9;
                border-radius: 8px;
                padding: 16px;
                margin: 24px 0;
                font-size: 14px;
                color: #0c4a6e;
            }
            .footer {
                margin-top: 32px;
                padding-top: 24px;
                border-top: 1px solid #e2e8f0;
                text-align: center;
                font-size: 14px;
                color: #64748b;
            }
            .footer a {
                color: #3b82f6;
                text-decoration: none;
            }
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto;">
                  <tr>
                    <td width="48" valign="middle" align="center" style="padding-right:12px;">
                      <div style="width:48px;height:48px;background:#475569 !important;background:linear-gradient(135deg, #475569 0%, #334155 100%) !important;border-radius:8px;color:#fef3c7 !important;font-weight:bold;font-size:20px;line-height:48px;border:2px solid #334155 !important;text-align:center;">CF</div>
                    </td>
                    <td valign="middle" align="left">
                      <div style="font-size:24px;font-weight:bold;color:#334155;margin:0;">Calculator Fort</div>
                      <div style="font-size:12px;color:#64748b;margin:4px 0 0 0;line-height:1.2;font-style:italic;">Fast, accurate online calculators</div>
                    </td>
                  </tr>
                </table>
                <h1 class="title">${title}</h1>
            </div>
            
            <div class="content">
                <div class="greeting">${greeting}</div>
                <div class="description">${description}</div>
                
                <div class="code-container">
                    <div class="code-label">Your Verification Code</div>
                    <div class="verification-code">${code}</div>
                </div>
                
                <div class="expiry-notice">
                    ⏰ <strong>Important:</strong> This verification code will expire in 15 minutes for security purposes.
                </div>
                
                ${isSignup ? `
                <div class="security-notice">
                    🛡️ <strong>Security Tip:</strong> Never share your verification codes with anyone. Calculator Fort will never ask for your verification code via email or phone.
                </div>
                ` : `
                <div class="security-notice">
                    🔐 <strong>Security Notice:</strong> If you didn't request this sign-in, please ignore this email. Your account remains secure.
                </div>
                `}
            </div>
        </div>
        
        <div class="footer">
            <p>
                This email was sent by <a href="https://calcfort.com">Calculator Fort</a><br>
                Need help? Visit our <a href="https://calcfort.com/contact">support page</a>
            </p>
            <p style="margin-top: 16px; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} Calculator Fort. All rights reserved.
            </p>
        </div>
    </body>
    </html>
    `;
  }

  private getVerificationEmailText(code: string, type: 'login' | 'signup'): string {
    const isSignup = type === 'signup';
    const greeting = isSignup ? 'Welcome to Calculator Fort!' : 'Sign in to Calculator Fort';
    const description = isSignup 
      ? 'Thank you for creating an account with Calculator Fort. To complete your registration, please use the verification code below:'
      : 'To sign in to your Calculator Fort account, please use the verification code below:';

    return `
${greeting}

${description}

Verification Code: ${code}

This code will expire in 15 minutes for security purposes.

${isSignup 
  ? 'Security Tip: Never share your verification codes with anyone. Calculator Fort will never ask for your verification code via email or phone.'
  : 'Security Notice: If you didn\'t request this sign-in, please ignore this email. Your account remains secure.'
}

---
Calculator Fort - Your trusted calculator and conversion tools
https://calcfort.com

Need help? Visit our support page: https://calcfort.com/contact

© ${new Date().getFullYear()} Calculator Fort. All rights reserved.
    `.trim();
  }

  async sendContactMessage(
    userEmail: string,
    userName: string,
    subject: string,
    message: string,
    category: string
  ): Promise<boolean> {
    // Send message to support team
    const supportEmailSent = await this.sendEmail({
      to: 'support@calcfort.com',
      subject: `[${category.toUpperCase()}] ${subject}`,
      html: this.getContactMessageTemplate(userEmail, userName, subject, message, category),
      text: this.getContactMessageText(userEmail, userName, subject, message, category)
    });

    // Send confirmation to user
    const userConfirmationSent = await this.sendEmail({
      to: userEmail,
      subject: 'Your message has been received - Calculator Fort',
      html: this.getContactConfirmationTemplate(userName, subject, category),
      text: this.getContactConfirmationText(userName, subject, category)
    });

    return supportEmailSent && userConfirmationSent;
  }

  private getContactMessageTemplate(
    userEmail: string,
    userName: string,
    subject: string,
    message: string,
    category: string
  ): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; }
            .container { background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; }
            .header { text-align: center; margin-bottom: 32px; color: #1a202c; }
            .field { margin-bottom: 20px; }
            .field-label { font-weight: bold; color: #2d3748; margin-bottom: 5px; }
            .field-value { background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; }
            .message-content { white-space: pre-wrap; }
            .category-badge { display: inline-block; background: #3b82f6; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📨 New Contact Message</h1>
                <div class="category-badge">${category}</div>
            </div>
            
            <div class="field">
                <div class="field-label">From:</div>
                <div class="field-value">${userName} &lt;${userEmail}&gt;</div>
            </div>
            
            <div class="field">
                <div class="field-label">Subject:</div>
                <div class="field-value">${subject}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Category:</div>
                <div class="field-value">${category}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Message:</div>
                <div class="field-value message-content">${message}</div>
            </div>
            
            <div style="margin-top: 24px; padding: 16px; background: #f0f9ff; border-radius: 8px; font-size: 14px; color: #0c4a6e;">
                📅 Received: ${new Date().toLocaleString()}<br>
                💌 Reply to: ${userEmail}
            </div>
        </div>
    </body>
    </html>
    `;
  }

  private getContactMessageText(
    userEmail: string,
    userName: string,
    subject: string,
    message: string,
    category: string
  ): string {
    return `
NEW CONTACT MESSAGE - Calculator Fort

From: ${userName} <${userEmail}>
Subject: ${subject}
Category: ${category}
Received: ${new Date().toLocaleString()}

Message:
${message}

---
Reply to: ${userEmail}
    `.trim();
  }

  private getContactConfirmationTemplate(userName: string, subject: string, category: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received - Calculator Fort</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; }
            .container { background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; }
            .header { text-align: center; margin-bottom: 32px; }
            .brand-text { font-size: 24px; font-weight: bold; color: #334155; margin-bottom: 8px; }
            .title { font-size: 28px; font-weight: bold; color: #1a202c; margin: 0; }
            .success-icon { font-size: 64px; margin-bottom: 20px; }
            .content { margin-bottom: 32px; }
            .info-box { background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 16px; margin: 20px 0; }
            .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 14px; color: #64748b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="brand-text">Calculator Fort</div>
                <div class="success-icon">✅</div>
                <h1 class="title">Message Received!</h1>
            </div>
            
            <div class="content">
                <p>Hi ${userName},</p>
                
                <p>Thank you for contacting Calculator Fort! We have successfully received your message and our support team will review it shortly.</p>
                
                <div class="info-box">
                    <strong>Your Message Details:</strong><br>
                    📋 Subject: ${subject}<br>
                    📂 Category: ${category}<br>
                    📅 Received: ${new Date().toLocaleString()}
                </div>
                
                <h3>What happens next?</h3>
                <ul>
                    <li><strong>General Inquiries:</strong> We'll respond within 24-48 hours</li>
                    <li><strong>Bug Reports:</strong> Our team will investigate within 12-24 hours</li>
                    <li><strong>Feature Requests:</strong> We'll review and respond within 2-3 business days</li>
                    <li><strong>Business/Technical Support:</strong> Expect a response within 1-2 business days</li>
                </ul>
                
                <p>In the meantime, feel free to explore our <a href="https://calcfort.com" style="color: #3b82f6;">calculator tools</a> or browse our <a href="https://calcfort.com/calculators" style="color: #3b82f6;">categories</a> for more useful calculators.</p>
                
                <p>If you have any urgent questions, you can also reach us directly at <a href="mailto:support@calcfort.com" style="color: #3b82f6;">support@calcfort.com</a>.</p>
                
                <p>Best regards,<br><strong>The Calculator Fort Team</strong></p>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent by <a href="https://calcfort.com" style="color: #3b82f6;">Calculator Fort</a></p>
            <p style="margin-top: 16px; font-size: 12px; color: #94a3b8;">© ${new Date().getFullYear()} Calculator Fort. All rights reserved.</p>
        </div>
    </body>
    </html>
    `;
  }

  private getContactConfirmationText(userName: string, subject: string, category: string): string {
    return `
Message Received - Calculator Fort

Hi ${userName},

Thank you for contacting Calculator Fort! We have successfully received your message and our support team will review it shortly.

Your Message Details:
- Subject: ${subject}
- Category: ${category}
- Received: ${new Date().toLocaleString()}

What happens next?
• General Inquiries: We'll respond within 24-48 hours
• Bug Reports: Our team will investigate within 12-24 hours  
• Feature Requests: We'll review and respond within 2-3 business days
• Business/Technical Support: Expect a response within 1-2 business days

In the meantime, feel free to explore our calculator tools at https://calcfort.com

If you have any urgent questions, you can reach us directly at support@calcfort.com

Best regards,
The Calculator Fort Team

---
Calculator Fort - Your trusted calculator and conversion tools
https://calcfort.com

© ${new Date().getFullYear()} Calculator Fort. All rights reserved.
    `.trim();
  }

  async testConnection(): Promise<boolean> {
    if (!this.transporter) {
      console.log('Email service not configured - using console logging');
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('Email service connection successful');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

// Create singleton instance
export const emailService = new EmailService();

// Export the class for testing
export { EmailService };
