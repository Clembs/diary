import { relations } from 'drizzle-orm';
import { pgTable, text, integer, date } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	email: text('email').notNull().unique(),
	avatar: text('avatar')
});

export const entries = pgTable('entries', {
	id: text('id').primaryKey(),
	date: date('date').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	summary: text('summary'),
	emoji: text('emoji'),
	emotion: text('emotion', {
		enum: ['HAPPY', 'DOWN', 'ANGRY', 'ANXIOUS', 'TIRED', 'CONTENT', 'STRESSED']
	})
});

export const activities = pgTable('activities', {
	id: text('id').primaryKey(),
	label: text('label').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	color: text('color')
});

export const usersRelations = relations(users, ({ many }) => ({
	entries: many(entries),
	activities: many(activities)
}));

export const entriesRelations = relations(entries, ({ one, many }) => ({
	user: one(users, {
		fields: [entries.userId],
		references: [users.id]
	}),
	activities: many(entryActivities)
}));

export const entryActivities = pgTable('entries_to_activities', {
	entryId: text('entry_id')
		.notNull()
		.references(() => entries.id),
	activityId: text('activity_id')
		.notNull()
		.references(() => activities.id),
	percent: integer('percent').notNull()
});

export const entryActivitiesRelations = relations(entryActivities, ({ one, many }) => ({
	entry: one(entries, {
		fields: [entryActivities.entryId],
		references: [entries.id]
	}),
	activity: one(activities, {
		fields: [entryActivities.activityId],
		references: [activities.id]
	})
}));
