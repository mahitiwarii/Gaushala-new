'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { cows, donations, updates } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

async function requireAdmin() {
  const { data: session } = await auth.getSession()
  if (!session?.user) throw new Error('Unauthorized')
  const allowed = (process.env.ADMIN_EMAILS ?? 'mahitwari.tech@gmail.com').split(',').map((email) => email.trim().toLowerCase())
  if (!allowed.includes(session.user.email.toLowerCase())) throw new Error('Forbidden')
}

export async function saveDonation(item: { id?: string; title: string; badgeCategory: string; priceInr: number; description: string; imageUrl?: string }) {
  await requireAdmin(); const id = item.id || crypto.randomUUID(); const values = { id, title: item.title.trim(), badgeCategory: item.badgeCategory.trim(), priceInr: Math.max(1, Math.round(item.priceInr)), description: item.description.trim(), imageUrl: item.imageUrl?.trim() || null, updatedAt: new Date() }
  await db.insert(donations).values(values).onConflictDoUpdate({ target: donations.id, set: values }); revalidatePath('/'); revalidatePath('/admin/dashboard'); return id
}
export async function deleteDonation(id: string) { await requireAdmin(); await db.delete(donations).where(eq(donations.id, id)); revalidatePath('/'); revalidatePath('/admin/dashboard') }
export async function saveCow(item: { id?: string; name: string; ageAndStatus: string; description: string; imageUrl?: string }) { await requireAdmin(); const id = item.id || crypto.randomUUID(); const values = { id, name: item.name.trim(), ageAndStatus: item.ageAndStatus.trim(), description: item.description.trim(), imageUrl: item.imageUrl?.trim() || null, updatedAt: new Date() }; await db.insert(cows).values(values).onConflictDoUpdate({ target: cows.id, set: values }); revalidatePath('/'); revalidatePath('/admin/dashboard'); return id }
export async function deleteCow(id: string) { await requireAdmin(); await db.delete(cows).where(eq(cows.id, id)); revalidatePath('/'); revalidatePath('/admin/dashboard') }
export async function saveUpdate(item: { id?: string; title: string; dateLabel: string; summary: string; imageUrl?: string }) { await requireAdmin(); const id = item.id || crypto.randomUUID(); const values = { id, title: item.title.trim(), dateLabel: item.dateLabel.trim(), summary: item.summary.trim(), imageUrl: item.imageUrl?.trim() || null, updatedAt: new Date() }; await db.insert(updates).values(values).onConflictDoUpdate({ target: updates.id, set: values }); revalidatePath('/'); revalidatePath('/admin/dashboard'); return id }
export async function deleteUpdate(id: string) { await requireAdmin(); await db.delete(updates).where(eq(updates.id, id)); revalidatePath('/'); revalidatePath('/admin/dashboard') }
