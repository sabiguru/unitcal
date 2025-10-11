import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.subject?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: body.subject.trim(),
      message: body.message.trim(),
      category: body.category || 'general'
    };

    // Send emails
    console.log('📧 Sending contact form emails...');
    const emailsSent = await emailService.sendContactMessage(
      sanitizedData.email,
      sanitizedData.name,
      sanitizedData.subject,
      sanitizedData.message,
      sanitizedData.category
    );

    if (emailsSent) {
      console.log('✅ Contact form emails sent successfully');
      return NextResponse.json({ 
        success: true,
        message: 'Your message has been sent successfully! We\'ll get back to you soon.' 
      });
    } else {
      console.log('⚠️ Contact form emails failed to send');
      return NextResponse.json({ 
        success: false,
        message: 'Your message was received but there was an issue sending confirmations. We\'ll still respond to your inquiry.' 
      });
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'There was an error processing your message. Please try again or contact us directly at support@calcfort.com' 
      },
      { status: 500 }
    );
  }
}