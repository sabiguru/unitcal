import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email';

export async function POST(request: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development mode' },
      { status: 403 }
    );
  }

  try {
    const { email, type } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    if (!type || !['login', 'signup'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "login" or "signup"' },
        { status: 400 }
      );
    }

    // Test connection first
    const connectionTest = await emailService.testConnection();
    
    // Generate a test verification code
    const testCode = '123456';
    
    // Send test email
    const emailSent = await emailService.sendVerificationCode(email, testCode, type as 'login' | 'signup');

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      connectionTest,
      emailSent,
      testCode: emailSent ? undefined : testCode, // Only show code if email wasn't sent
    });

  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { error: 'Failed to send test email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}