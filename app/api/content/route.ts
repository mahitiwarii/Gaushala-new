import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cows, donations, updates } from '@/lib/db/schema'

export async function GET() {
  const [donationRows, cowRows, updateRows] = await Promise.all([db.select().from(donations), db.select().from(cows), db.select().from(updates)])
  return NextResponse.json({ donations: donationRows, cows: cowRows, updates: updateRows }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } })
}
