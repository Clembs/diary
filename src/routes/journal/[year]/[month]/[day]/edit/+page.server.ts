import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getBaseServerUrl } from '$lib/helpers/getBaseServerUrl';
import { db } from '$lib/db';
import { entries } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { addLeadingZero } from '$lib/helpers/addLeadingZero';

export const actions: Actions = {
	default: async ({ request, url, params, locals: { getUserData } }) => {
		const userData = await getUserData();
		const journalBaseUrl = url.searchParams.get('baseUrl');

		if (!journalBaseUrl || !/https?:\/\/.*/.test(journalBaseUrl)) {
			throw error(400, 'Invalid journal base URL');
		}

		if (getBaseServerUrl(journalBaseUrl) !== url.origin) {
			throw error(
				400,
				'You can only edit journals from the same server as the one you are currently on.'
			);
		}

		if (!userData) {
			throw error(401, 'You must be logged in to edit a journal.');
		}

		if (userData?.id !== journalBaseUrl.split('/').at(-1)) {
			throw error(400, 'You can only edit your own journals.');
		}

		const date = `${params.year}-${addLeadingZero(params.month)}-${addLeadingZero(params.day)}`;
		const formData = await request.formData();
		const summary = formData.get('summary')?.toString();
		const id = `${userData.id}-${date}`;

		if (!summary) {
			throw error(400, 'No summary provided');
		}

		const newEntry = await db
			.insert(entries)
			.values({
				id,
				date,
				summary,
				userId: userData.id
			})
			.onConflictDoUpdate({
				where: eq(entries.id, id),
				set: {
					summary
				},
				target: [entries.id]
			})
			.returning();

		return {
			...newEntry
		};
	}
};
