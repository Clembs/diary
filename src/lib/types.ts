import {
	object,
	string,
	nullable,
	enum_,
	type Output,
	regex,
	array,
	number,
	minValue,
	maxValue
} from 'valibot';
import type { sessions, users } from './db/schema';

export const UserSchema = object({
	id: string(),
	username: string(),
	avatar: nullable(string())
});

export enum Emotion {
	HAPPY = 'HAPPY',
	DOWN = 'DOWN',
	ANGRY = 'ANGRY',
	ANXIOUS = 'ANXIOUS',
	TIRED = 'TIRED',
	CONTENT = 'CONTENT',
	STRESSED = 'STRESSED'
}

export const ActivitySchema = object({
	label: string(),
	color: nullable(string([regex(/^#[0-9a-f]{6}$/i)]))
});

export const EntrySchema = object({
	id: string(),
	date: string(),
	summary: nullable(string()),
	emoji: nullable(string()),
	emotion: nullable(enum_(Emotion)),
	activities: array(
		object({
			percent: number([minValue(0), maxValue(100)]),
			activity: ActivitySchema
		})
	)
});

export type User = Output<typeof UserSchema>;

export type Activity = Output<typeof ActivitySchema>;

export type Entry = Output<typeof EntrySchema>;

export type Session = typeof sessions.$inferSelect & {
	user: typeof users.$inferSelect;
};
