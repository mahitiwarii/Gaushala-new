import { auth } from '@/lib/auth'

export default auth.middleware({ loginUrl: '/sign-in' })

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
