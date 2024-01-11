import { PASSWORD } from '$env/static/private';
import { db } from '$lib/db';
import { createSession } from '$lib/helpers/account';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const formData = await request.formData();
		const password = formData.get('password');

		if (password === PASSWORD) {
			const user = (await db.query.users.findFirst({
				where: ({ username }, { eq }) => eq(username, 'Clembs')
			}))!;

			await createSession(event, user.id);

			return redirect(302, '/');
		} else {
			return fail(401, { message: 'Incorrect password' });
		}
	}
};
