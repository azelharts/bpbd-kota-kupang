import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/auth';
import { LoginCredentials, AuthResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password }: LoginCredentials = await request.json();

    // Validate credentials
    if (username !== 'admin' || password !== 'adminbpbd') {
      const response: AuthResponse = {
        success: false,
        message: 'Username atau password salah',
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Create session
    const session = await getIronSession<{
      isLoggedIn: boolean;
      username: string;
    }>(request.cookies, sessionOptions);

    session.isLoggedIn = true;
    session.username = username;
    await session.save();

    const response: AuthResponse = {
      success: true,
      message: 'Login berhasil',
      user: { username },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Login error:', error);
    const response: AuthResponse = {
      success: false,
      message: 'Terjadi kesalahan server',
    };
    return NextResponse.json(response, { status: 500 });
  }
}