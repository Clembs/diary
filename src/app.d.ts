// See https://kit.svelte.dev/docs/types#app

import type { users } from '$lib/db/schema';
import type { Session } from '$lib/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession: () => Promise<Session | null>;
			getUserData: () => Promise<typeof users.$inferSelect | null | undefined>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
