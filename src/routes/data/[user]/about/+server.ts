import { db } from '$lib/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const user = await db.query.users.findFirst({
		where: ({ id }, { eq }) => eq(id, params.user),
		columns: {
			id: true,
			username: true,
			avatar: true
		}
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	return json(user);
};
