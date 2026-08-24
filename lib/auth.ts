import { createNeonAuth } from '@neondatabase/auth/next/server'

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET_2 ?? process.env.NEON_AUTH_COOKIE_SECRET ?? process.env.BETTER_AUTH_SECRET ?? 'v0-local-build-secret-32-characters-long',
  },
})
