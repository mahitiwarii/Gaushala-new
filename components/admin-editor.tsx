'use client'

import { useMemo, useState } from 'react'
import { saveSiteContent } from '@/app/admin/actions'

const groups = {
  Overview: ['heroTitle', 'heroDescription', 'impactStatement'],
  Settings: ['contactEmail', 'contactPhone', 'hours', 'whatsappNumber', 'instagramUrl', 'donationNote'],
  Donations: ['donationPresets', 'donationGoal', 'paymentInstructions'],
  'Products & Sewa': ['products'],
  Cows: ['cows'],
  Updates: ['updates'],
  Reviews: ['reviews'],
  'Gallery / Media': ['gallery'],
} as const

const labels: Record<string, string> = {
  heroTitle: 'Hero title', heroDescription: 'Hero description', impactStatement: 'Impact statement', contactEmail: 'Contact email', contactPhone: 'Contact phone', hours: 'Opening hours', whatsappNumber: 'WhatsApp number', instagramUrl: 'Instagram URL', donationNote: 'Donation note', donationPresets: 'Donation presets (JSON array)', donationGoal: 'Donation goal', paymentInstructions: 'Payment instructions', products: 'Products & sewa (JSON array)', cows: 'Cows for adoption (JSON array)', updates: 'Monthly updates (JSON array)', reviews: 'Reviews (JSON array)', gallery: 'Gallery items (JSON array)',
}

const defaults: Record<string, unknown> = { heroTitle: '', heroDescription: '', impactStatement: '', contactEmail: '', contactPhone: '', hours: '', whatsappNumber: '', instagramUrl: '', donationNote: '', donationPresets: '[501, 1100, 3100, 5100]', donationGoal: '', paymentInstructions: '', products: '[]', cows: '[]', updates: '[]', reviews: '[]', gallery: '[]' }

export function AdminEditor({ initialContent }: { initialContent: Record<string, unknown> }) {
  const [active, setActive] = useState<keyof typeof groups>('Overview')
  const [content, setContent] = useState<Record<string, unknown>>({ ...defaults, ...initialContent })
  const [status, setStatus] = useState('')
  const fields = groups[active]
  const stats = useMemo(() => ({ fields: Object.keys(content).length, media: ['products', 'cows', 'updates', 'gallery'].reduce((n, key) => { try { return n + (Array.isArray(content[key]) ? content[key].length : JSON.parse(String(content[key] || '[]')).length) } catch { return n } }, 0) }), [content])
  async function save() { setStatus('Saving changes…'); try { const normalized = { ...content }; for (const key of ['donationPresets', 'products', 'cows', 'updates', 'reviews', 'gallery']) { if (typeof normalized[key] === 'string') normalized[key] = JSON.parse(normalized[key] as string) } await saveSiteContent(normalized); setContent(normalized); setStatus('Saved and published to the website') } catch { setStatus('Please check JSON fields and try again') } }
  return <div className="mt-10 grid gap-6 lg:grid-cols-[220px_1fr]"><nav className="rounded-3xl border border-border bg-card p-3"><p className="px-3 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Workspace</p>{(Object.keys(groups) as Array<keyof typeof groups>).map((item) => <button key={item} onClick={() => setActive(item)} className={`flex w-full rounded-2xl px-3 py-3 text-left text-sm font-semibold transition ${active === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-primary'}`}>{item}</button>)}<div className="mt-6 border-t border-border px-3 pt-5 text-xs leading-5 text-muted-foreground"><strong className="text-primary">{stats.fields}</strong> editable fields<br /><strong className="text-primary">{stats.media}</strong> managed records</div></nav><section className="rounded-3xl border border-border bg-card p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-accent-foreground">{active}</p><h2 className="mt-2 font-serif text-4xl text-primary">Manage {active.toLowerCase()}</h2><p className="mt-2 text-sm text-muted-foreground">Edit the content that appears on your public sanctuary website.</p></div><button onClick={save} className="rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground">Save & publish</button></div><div className="mt-8 grid gap-5">{fields.map((key) => <label key={key} className="block text-sm font-semibold text-primary">{labels[key]}{['heroDescription', 'impactStatement', 'donationNote', 'paymentInstructions', 'products', 'cows', 'updates', 'reviews', 'gallery', 'donationPresets'].includes(key) ? <textarea rows={['products', 'cows', 'updates', 'reviews', 'gallery'].includes(key) ? 9 : 4} value={typeof content[key] === 'string' ? content[key] as string : JSON.stringify(content[key], null, 2)} onChange={(event) => setContent((current) => ({ ...current, [key]: event.target.value }))} className="mt-2 w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 font-mono text-xs font-normal leading-6 outline-none focus:ring-2 focus:ring-accent" /> : <input value={String(content[key] ?? '')} onChange={(event) => setContent((current) => ({ ...current, [key]: event.target.value }))} className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent" />}</label>)}</div>{status && <p role="status" className="mt-6 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary">{status}</p>}</section></div>
}
