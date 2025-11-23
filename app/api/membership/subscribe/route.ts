import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { membershipTier, paymentMethod } = await request.json();

    if (!membershipTier || !['FOUNDER', 'PREMIUM', 'ANNUAL'].includes(membershipTier)) {
      return NextResponse.json(
        { error: 'Invalid membership tier' },
        { status: 400 }
      );
    }

    // Update user membership
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        membershipTier: membershipTier,
        membershipStatus: 'ACTIVE',
        trialEndsAt: null, // Clear trial when they upgrade
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully upgraded to ${membershipTier} membership!`,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        membershipTier: updatedUser.membershipTier,
        membershipStatus: updatedUser.membershipStatus,
      }
    });

  } catch (error) {
    console.error('Membership upgrade error:', error);
    return NextResponse.json(
      { error: 'Failed to upgrade membership' },
      { status: 500 }
    );
  }
}