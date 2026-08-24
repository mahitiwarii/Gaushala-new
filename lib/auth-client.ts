'use client'
import { createAuthClient } from '@neondatabase/auth'

export const authClient = createAuthClient(process.env.NEXT_PUBLIC_NEON_AUTH_URL ?? process.env.VITE_NEON_AUTH_URL ?? '')
export const { signIn, signUp, signOut, useSession } = authClient
