import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { sessions } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ cookies, locals: { getSession } }) => {
	const session = await getSession();

	if (session) {
		await db.delete(sessions).where(eq(sessions.id, session.id));

		cookies.delete('session_id', {
			path: '/'
		});
	}

	throw redirect(302, '/login');
};
