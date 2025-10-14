import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession(request.cookies, sessionOptions);

    if (!session.isLoggedIn) {
      return NextResponse.json({ isLoggedIn: false }, { status: 401 });
    }

    return NextResponse.json({
      isLoggedIn: true,
      username: session.username,
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ isLoggedIn: false }, { status  : 500 });
  }
}