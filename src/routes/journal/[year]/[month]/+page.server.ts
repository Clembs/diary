import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { array, parse } from 'valibot';
import { EntrySchema, type Entry } from '$lib/types';

export const load: PageServerLoad = async ({ url, fetch, params, parent }) => {
	const journalBaseUrl = url.searchParams.get('baseUrl');

	if (!journalBaseUrl || !/https?:\/\/.*/.test(journalBaseUrl)) {
		throw error(400, 'Invalid journal base URL');
	}

	const reqUrl = `${journalBaseUrl}/entries/${params.year}/${params.month}`;

	try {
		const req = await fetch(reqUrl, {
			method: 'GET',
			headers: {
				'User-Agent': 'Diary/1.0.0 (https://diary.clembs.com)'
			}
		});

		if (!req.ok || !req.headers.get('content-type')?.startsWith('application/json'))
			return fail(400, {
				message: 'Invalid URL or journal not found.'
			});

		const res = await req.json();
		let entries: Entry[];

		try {
			entries = parse(array(EntrySchema), res);
		} catch (e) {
			throw error(400, 'Invalid entry schema.');
		}

		const { user, baseUrl } = await parent();

		return { entries, baseUrl: baseUrl!, user: user! };
	} catch (e) {
		throw error(400, String(e));
	}
};
