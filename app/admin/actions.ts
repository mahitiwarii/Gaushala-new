'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { siteContent } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const { data: session } = await auth.getSession()
  if (!session?.user) throw new Error('Unauthorized')
  const adminEmails = (process.env.ADMIN_EMAILS ?? 'mahitwari.tech@gmail.com').split(',').map((email) => email.trim().toLowerCase())
  if (!adminEmails.includes(session.user.email.toLowerCase())) throw new Error('Forbidden')
  return session.user
}

export async function saveSiteContent(content: Record<string, unknown>) {
  const user = await requireAdmin()
  await db.insert(siteContent).values({ id: 'main', content, updatedBy: user.id }).onConflictDoUpdate({ target: siteContent.id, set: { content, updatedBy: user.id, updatedAt: new Date() } })
  revalidatePath('/')
  revalidatePath('/admin')
}
