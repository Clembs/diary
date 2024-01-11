import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parse } from 'valibot';
import { EntrySchema, type Entry } from '$lib/types';

export const load: PageServerLoad = async ({ url, fetch, params, parent, setHeaders }) => {
	const journalBaseUrl = url.searchParams.get('baseUrl');

	if (!journalBaseUrl || !/https?:\/\/.*/.test(journalBaseUrl)) {
		throw error(400, 'Invalid journal base URL');
	}

	const reqUrl = `${journalBaseUrl}/entries/${params.year}/${params.month}/${params.day}`;

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

		if (!res) {
			throw error(404, 'Entry not found.');
		}

		let entry: Entry;

		try {
			entry = parse(EntrySchema, res);
		} catch (e) {
			throw error(400, 'Invalid entry schema.');
		}

		const { user, baseUrl } = await parent();

		setHeaders({
			'Cache-Control': 'max-age=3600'
		});

		return { entry: entry!, baseUrl: baseUrl!, user: user! };
	} catch (e) {
		throw error(400, 'Request failed. Make sure that the URL is correct.');
	}
};
