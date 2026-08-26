'use client'

import Link from 'next/link'
import { ArrowLeft, Heart, Home, ShieldCheck, Stethoscope, Wheat } from 'lucide-react'

const story = `Behind every quiet gaze in our sanctuary lies a story of survival, resilience, and quiet grace. Across busy streets and lonely roads, countless cattle spend years wandering without shelter, exposed to harsh weather, hunger, and traffic accidents—forgotten after a lifetime of gentle giving. We founded our sanctuary on one simple conviction: no innocent soul should ever end its journey in neglect or pain. Here, far from the chaos of the roadside, fear slowly transforms into trust. Every rescued cow is welcomed by name, wrapped in genuine care, and provided with round-the-clock medical attention, warm shelter, and daily nutritious food. We do not view them merely as animals in need of refuge, but as living, feeling family members who deserve dignity, respect, and unconditional love. Watching an injured or elderly cow take its first peaceful rest on soft bedding reminds us why this work matters so deeply. Yet, this haven stays alive entirely through the kindness of human hearts. When you extend your hand to support our sanctuary, you aren't just providing fodder or medicine—you are restoring hope, healing quiet wounds, and giving a voiceless soul the safe, loving forever home it always deserved.`

const values = [
  { icon: Heart, title: 'Rescue with compassion', text: 'Every call is met with patience, dignity, and a promise that no vulnerable life is forgotten.' },
  { icon: Stethoscope, title: 'Healing every day', text: 'Round-the-clock medical attention helps injured, elderly, and recovering cows feel safe again.' },
  { icon: Home, title: 'A forever home', text: 'Warm shelter, soft bedding, and peaceful spaces replace the fear of busy roads.' },
  { icon: Wheat, title: 'Nourishment and care', text: 'Daily nutritious food and clean water help each resident regain strength and trust.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Return to home">
            <img src="/images/sanctuary-logo.jpeg" alt="Shri Neem Karori Baba Gau Sewa" className="size-11 rounded-full object-cover" />
            <span className="text-xs font-bold uppercase leading-tight tracking-[0.16em] text-primary sm:text-sm">Shri Neem Karori<br />Baba Gau Sewa</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary"><ArrowLeft size={16} /> Back home</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[.92fr_1.08fr] lg:px-8 lg:pb-28 lg:pt-24">
        <div className="order-2 lg:order-1">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground"><span className="h-px w-8 bg-accent" /> Our story</p>
          <h1 className="max-w-xl text-balance font-serif text-5xl leading-[1.05] text-primary sm:text-6xl">A quiet place for <em className="font-serif not-italic text-accent">gentle lives.</em></h1>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">We believe every cow deserves more than survival. They deserve a name, a safe bed, a full stomach, and the freedom to heal without fear.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/#donate-shop" className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition hover:-translate-y-0.5 hover:shadow-lg">Support the sanctuary</Link><Link href="/#cow-adoption" className="rounded-full border border-border px-6 py-3 text-sm font-bold text-primary transition hover:border-primary">Meet our residents</Link></div>
        </div>
        <div className="relative order-1 lg:order-2"><div className="overflow-hidden rounded-[3rem_3rem_1.25rem_1.25rem] bg-muted shadow-2xl"><img src="/images/about-cow-sanctuary.png" alt="Rescued cow resting peacefully at the sanctuary" className="aspect-[.9] w-full object-cover sm:aspect-[1.05]" /></div><div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-xl sm:left-6"><ShieldCheck className="text-accent" size={22} /><span className="text-sm font-semibold text-primary">A home built on kindness</span></div></div>
      </section>

      <section className="bg-secondary/60 px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">Why we exist</p><h2 className="font-serif text-4xl leading-tight text-primary sm:text-5xl">From fear to <em className="font-serif not-italic text-accent">belonging.</em></h2></div><div className="space-y-6 text-base leading-8 text-muted-foreground"><p>{story.slice(0, 866)}</p><p>{story.slice(866)}</p></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="mb-10 max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">The promise of seva</p><h2 className="font-serif text-4xl text-primary sm:text-5xl">Care that feels like <em className="font-serif not-italic text-accent">family.</em></h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{values.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-3xl border border-border bg-card p-6"><Icon className="mb-10 text-accent" size={24} /><h3 className="font-serif text-2xl text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></section>

      <section className="mx-5 mb-10 rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground sm:px-10 lg:mx-auto lg:max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Join the circle of care</p><h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl sm:text-5xl">Your kindness gives a quiet soul a <em className="font-serif not-italic text-accent">tomorrow.</em></h2><p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-primary-foreground/75">When you support our sanctuary, you help turn rescue into recovery and shelter into a forever home.</p><Link href="/#donate-shop" className="mt-8 inline-flex rounded-full bg-accent px-7 py-3 text-sm font-bold text-accent-foreground transition hover:-translate-y-0.5 hover:shadow-lg">Give with love</Link></section>
    </main>
  )
}
