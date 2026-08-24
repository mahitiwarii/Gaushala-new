'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, signUp } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setPending(true)
    const form = new FormData(event.currentTarget)
    const result = mode === 'sign-in' ? await signIn.email({ email: String(form.get('email')), password: String(form.get('password')) }) : await signUp.email({ email: String(form.get('email')), password: String(form.get('password')), name: String(form.get('name')) })
    setPending(false)
    if (result.error) { setError('Unable to authenticate. Please check your details.'); return }
    router.push('/admin'); router.refresh()
  }
  return <form onSubmit={submit} className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">Sanctuary admin</p><h1 className="mt-2 font-serif text-4xl text-primary">{mode === 'sign-in' ? 'Welcome back' : 'Create admin account'}</h1><div className="mt-7 space-y-4">{mode === 'sign-up' && <label className="block text-sm font-semibold text-primary">Name<input name="name" required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3" /></label>}<label className="block text-sm font-semibold text-primary">Email<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3" /></label><label className="block text-sm font-semibold text-primary">Password<input name="password" type="password" minLength={8} required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3" /></label></div>{error && <p className="mt-4 text-sm text-destructive">{error}</p>}<button disabled={pending} className="mt-6 w-full rounded-full bg-accent py-3 font-bold text-accent-foreground disabled:opacity-60">{pending ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}</button>{mode === 'sign-in' && <a href="mailto:mahitwari.tech@gmail.com?subject=Gaushala%20admin%20password%20reset" className="mt-4 block text-center text-sm font-semibold text-primary underline-offset-4 hover:underline">Forgot password? Contact recovery email</a>}<p className="mt-5 text-center text-sm text-muted-foreground">{mode === 'sign-in' ? <>Need an admin account? <Link href="/sign-up" className="font-bold text-primary underline-offset-4 hover:underline">Create one</Link></> : <>Already have an account? <Link href="/sign-in" className="font-bold text-primary underline-offset-4 hover:underline">Sign in</Link></>}</p></form>
}
