import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  birthDate?: string;
  goals?: string[];
  classInterests?: string[];
  experienceLevel?: string;
  practiceTime?: string;
  sessionDuration?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate password length
    if (body.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
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

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(body.password, 12);

    // Calculate trial end date (7 days from now)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 7);

    // Parse birth date if provided
    const birthDate = body.birthDate ? new Date(body.birthDate) : null;

    // Create user with onboarding data
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash,
        birthDate,
        goals: body.goals ? JSON.stringify(body.goals) : null,
        classInterests: body.classInterests ? JSON.stringify(body.classInterests) : null,
        experienceLevel: body.experienceLevel || null,
        practiceTime: body.practiceTime || null,
        sessionDuration: body.sessionDuration || null,
        membershipTier: 'FREE',
        membershipStatus: 'TRIALING',
        trialEndsAt,
      },
    });

    // Return success (don't include sensitive data)
    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          goals: user.goals ? JSON.parse(user.goals) : [],
          classInterests: user.classInterests ? JSON.parse(user.classInterests) : [],
          experienceLevel: user.experienceLevel,
          practiceTime: user.practiceTime,
          sessionDuration: user.sessionDuration,
          membershipTier: user.membershipTier,
          membershipStatus: user.membershipStatus,
          trialEndsAt: user.trialEndsAt,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}