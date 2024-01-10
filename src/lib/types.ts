import { object, string, nullable, enum_, type Output, regex } from 'valibot';

export const UserSchema = object({
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
	id: string(),
	label: string(),
	color: nullable(string([regex(/^#[0-9a-f]{6}$/i)]))
});

export const EntrySchema = object({
	id: string(),
	date: string(),
	summary: nullable(string()),
	emoji: nullable(string()),
	emotion: nullable(enum_(Emotion)),
	activities: nullable(
		object({
			percent: string(),
			activity: ActivitySchema
		})
	)
});

export type User = Output<typeof UserSchema>;

export type Activity = Output<typeof ActivitySchema>;

export type Entry = Output<typeof EntrySchema>;
