import { db } from '$lib/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const user = await db.query.users.findFirst({
		where: ({ username }, { eq }) => eq(username, params.user),
		columns: {
			username: true,
			avatar: true
		}
	});

	console.log(user);

	if (!user) {
		throw error(404, 'User not found');
	}

	return json(user);
};
