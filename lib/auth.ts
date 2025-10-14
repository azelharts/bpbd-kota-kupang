import { IronSessionOptions } from 'iron-session';
import { SessionData } from '@/types/auth';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
  cookieName: 'bpbd-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
  username: '',
};