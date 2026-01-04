import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, code, type } = await request.json();

    if (!email || !code || !type) {
      return NextResponse.json(
        { error: 'Email, code, and type are required' },
        { status: 400 }
      );
    }

    // Find the verification code
    const verificationRecord = await prisma.verificationCode.findUnique({
      where: { email }
    });

    if (!verificationRecord) {
      return NextResponse.json(
        { error: 'No verification code found for this email' },
        { status: 400 }
      );
    }

    // Check if code matches
    if (verificationRecord.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Check if code has expired
    if (verificationRecord.expiresAt < new Date()) {
      await prisma.verificationCode.delete({
        where: { email }
      });
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Check if type matches
    if (verificationRecord.type !== type) {
      return NextResponse.json(
        { error: 'Invalid verification type' },
        { status: 400 }
      );
    }

    if (type === 'signup') {
      // Create new user account
      const user = await prisma.user.create({
        data: {
          email,
          emailVerified: new Date(),
          // No password needed for email-only auth
        }
      });

      // Delete the verification code
      await prisma.verificationCode.delete({
        where: { email }
      });

      return NextResponse.json({
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
        }
      });
    }

    if (type === 'login') {
      // Find the user
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 400 }
        );
      }

      // Delete the verification code
      await prisma.verificationCode.delete({
        where: { email }
      });

      // Generate a temporary token for NextAuth
      const token = `verify_${Date.now()}_${Math.random()}`;

      return NextResponse.json({
        message: 'Verification successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid verification type' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Verify code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}