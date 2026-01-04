import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { emailService } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, type } = await request.json();

    if (!email || !type) {
      return NextResponse.json(
        { error: 'Email and type are required' },
        { status: 400 }
      );
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration time (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // For signup, create or update verification record
    if (type === 'signup') {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists with this email' },
          { status: 400 }
        );
      }

      // Store verification code in database
      await prisma.verificationCode.upsert({
        where: { email },
        update: {
          code: verificationCode,
          expiresAt,
          type: 'signup'
        },
        create: {
          email,
          code: verificationCode,
          expiresAt,
          type: 'signup'
        }
      });
    }

    // For login, check if user exists and create verification code
    if (type === 'login') {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (!existingUser) {
        return NextResponse.json(
          { error: 'No account found with this email' },
          { status: 400 }
        );
      }

      await prisma.verificationCode.upsert({
        where: { email },
        update: {
          code: verificationCode,
          expiresAt,
          type: 'login'
        },
        create: {
          email,
          code: verificationCode,
          expiresAt,
          type: 'login'
        }
      });
    }

    // Send verification email
    const emailSent = await emailService.sendVerificationCode(email, verificationCode, type);
    
    if (!emailSent) {
      // If email service is not configured, log to console for development
      console.log(`[DEVELOPMENT] Verification code for ${email}: ${verificationCode}`);
    }

    const response: any = {
      message: 'Verification code sent successfully',
    };

    // In development mode, include the code in the response if email wasn't sent
    if (process.env.NODE_ENV === 'development' && !emailSent) {
      response.developmentCode = verificationCode;
      response.note = 'Email service not configured - check console for verification code';
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Send verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}