import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { UserSchema } from '$lib/types';
import { parse } from 'valibot';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const url = data.get('url')?.toString();

		if (!url)
			return fail(400, {
				message: 'No URL provided'
			});

		const req = await fetch(`${url}/about`, {
			method: 'GET',
			headers: {
				'User-Agent': 'Diary/1.0.0 (https://diary.clembs.com)'
			}
		});

		if (!req.ok || !req.headers.get('content-type')?.startsWith('application/json'))
			return fail(400, {
				message: 'Invalid URL'
			});

		const res = await req.json();

		console.log(res);

		const user = parse(UserSchema, res);

		if (!user) {
			throw error(400, 'Invalid user');
		}

		return { user, baseUrl: url };
	}
};
