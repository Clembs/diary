import { error, fail } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { UserSchema } from '$lib/types';
import { parse } from 'valibot';

export const load: LayoutServerLoad = async ({ setHeaders, fetch, url }) => {
	const journalBaseUrl = url.searchParams.get('baseUrl');

	if (!journalBaseUrl || !/https?:\/\/.*/.test(journalBaseUrl)) {
		throw error(400, 'Invalid journal base URL');
	}

	const reqUrl = `${journalBaseUrl}/about`;

	try {
		const req = await fetch(reqUrl, {
			method: 'GET',
			headers: {
				'User-Agent': 'Diary/1.0.0 (https://diary.clembs.com)'
			}
		});

		if (!req.ok || !req.headers.get('content-type')?.startsWith('application/json')) {
			return fail(400, {
				message: 'Invalid URL'
			});
		}

		const res = await req.json();

		const user = parse(UserSchema, res);

		if (!user) {
			throw error(400, 'Invalid user');
		}

		// setHeaders({
		// 	'Cache-Control': 'max-age=3600'
		// });

		return { user, baseUrl: journalBaseUrl };
	} catch (e) {
		throw error(400, 'Request failed. Make sure that the URL is correct.');
	}
};
