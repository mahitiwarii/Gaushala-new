import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { siteContent } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { AdminEditor } from '@/components/admin-editor'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const { data: session } = await auth.getSession()
  if (!session?.user) redirect('/sign-in')
  const [row] = await db.select().from(siteContent).where(eq(siteContent.id, 'main')).limit(1)
  return <main className="min-h-screen bg-background"><div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><header className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-7"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">Sanctuary admin CMS</p><h1 className="mt-2 font-serif text-5xl text-primary">Your website, your voice.</h1><p className="mt-3 text-sm text-muted-foreground">Signed in as {session.user.email}. Changes publish directly to the public site.</p></div><div className="flex gap-3"><a href="/" className="rounded-full border border-border px-5 py-3 text-sm font-bold text-primary">View website</a><a href="/api/auth/sign-out" className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Sign out</a></div></header><AdminEditor initialContent={(row?.content as Record<string, unknown>) ?? {}} /></div></main>
}
