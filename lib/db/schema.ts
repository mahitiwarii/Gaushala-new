import { pgTable, text, timestamp, boolean, jsonb, integer } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull().unique(), emailVerified: boolean('emailVerified').notNull().default(false), image: text('image'), createdAt: timestamp('createdAt').notNull().defaultNow(), updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
export const session = pgTable('session', {
  id: text('id').primaryKey(), expiresAt: timestamp('expiresAt').notNull(), token: text('token').notNull().unique(), createdAt: timestamp('createdAt').notNull().defaultNow(), updatedAt: timestamp('updatedAt').notNull().defaultNow(), ipAddress: text('ipAddress'), userAgent: text('userAgent'), userId: text('userId').notNull(),
})
export const account = pgTable('account', {
  id: text('id').primaryKey(), accountId: text('accountId').notNull(), providerId: text('providerId').notNull(), userId: text('userId').notNull(), accessToken: text('accessToken'), refreshToken: text('refreshToken'), idToken: text('idToken'), accessTokenExpiresAt: timestamp('accessTokenExpiresAt'), refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'), scope: text('scope'), password: text('password'), createdAt: timestamp('createdAt').notNull().defaultNow(), updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
export const verification = pgTable('verification', {
  id: text('id').primaryKey(), identifier: text('identifier').notNull(), value: text('value').notNull(), expiresAt: timestamp('expiresAt').notNull(), createdAt: timestamp('createdAt').defaultNow(), updatedAt: timestamp('updatedAt').defaultNow(),
})
export const siteContent = pgTable('site_content', {
  id: text('id').primaryKey(), content: jsonb('content').$type<Record<string, unknown>>().notNull().default({}), updatedAt: timestamp('updatedAt').notNull().defaultNow(), updatedBy: text('updatedBy'),
})
export const donations = pgTable('donations', { id: text('id').primaryKey(), title: text('title').notNull(), badgeCategory: text('badge_category').notNull().default('Seva'), priceInr: integer('price_inr').notNull(), description: text('description').notNull().default(''), imageUrl: text('image_url'), createdAt: timestamp('created_at').notNull().defaultNow(), updatedAt: timestamp('updated_at').notNull().defaultNow() })
export const cows = pgTable('cows', { id: text('id').primaryKey(), name: text('name').notNull(), ageAndStatus: text('age_and_status').notNull().default(''), description: text('description').notNull().default(''), imageUrl: text('image_url'), createdAt: timestamp('created_at').notNull().defaultNow(), updatedAt: timestamp('updated_at').notNull().defaultNow() })
export const updates = pgTable('updates', { id: text('id').primaryKey(), title: text('title').notNull(), dateLabel: text('date_label').notNull().default(''), summary: text('summary').notNull().default(''), imageUrl: text('image_url'), createdAt: timestamp('created_at').notNull().defaultNow(), updatedAt: timestamp('updated_at').notNull().defaultNow() })
