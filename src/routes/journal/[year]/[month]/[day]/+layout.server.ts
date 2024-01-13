import { error, fail } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { parse } from 'valibot';
import { EntrySchema, type Entry } from '$lib/types';

export const load: LayoutServerLoad = async ({ url, fetch, params, parent, setHeaders }) => {
	const journalBaseUrl = url.searchParams.get('baseUrl');

	if (!journalBaseUrl || !/https?:\/\/.*/.test(journalBaseUrl)) {
		throw error(400, 'Invalid journal base URL');
	}

	const reqUrl = `${journalBaseUrl}/entries/${params.year}/${params.month}/${params.day}`;

	let req: Response;

	try {
		req = await fetch(reqUrl, {
			method: 'GET',
			headers: {
				'User-Agent': 'Diary/1.0.0 (https://diary.clembs.com)'
			}
		});

		if (!req.ok || !req.headers.get('content-type')?.startsWith('application/json'))
			return fail(400, {
				message: 'Invalid URL or journal not found.'
			});
	} catch (e) {
		throw error(400, 'Request failed. Make sure that the URL is correct.');
	}

	const res = await req.json();

	let entry: Entry | null = null;

	if (res) {
		try {
			entry = parse(EntrySchema, res);
		} catch (e) {
			throw error(400, 'Invalid entry schema.');
		}
	}

	setHeaders({
		'Cache-Control': 'max-age=3600'
	});

	return { entry, ...(await parent()) };
};
