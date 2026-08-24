import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { cows, donations, updates } from '@/lib/db/schema'
import { AdminCrud } from '@/components/admin-crud'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const { data: session } = await auth.getSession()
  if (!session?.user) redirect('/sign-in')
  const [donationRows, cowRows, updateRows] = await Promise.all([db.select().from(donations), db.select().from(cows), db.select().from(updates)])
  return <main className="min-h-screen bg-background"><div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-7"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">GauSewa CMS</p><h1 className="mt-2 font-serif text-4xl text-primary sm:text-5xl">Content dashboard</h1><p className="mt-3 text-sm text-muted-foreground">Manage donations, cow adoption profiles and sanctuary updates.</p></div><div className="flex gap-3"><a href="/" className="rounded-full border border-border px-4 py-2 text-sm font-bold text-primary">View website</a><a href="/admin" className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Site settings</a></div></header><AdminCrud initial={{ donations: donationRows, cows: cowRows, updates: updateRows }} /></div></main>
}
