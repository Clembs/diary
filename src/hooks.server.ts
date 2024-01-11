import { db } from '$lib/db';
import { renewSession } from '$lib/helpers/account';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_id');

	event.locals.getSession = async () => {
		if (!sessionId) return null;

		const session = await db.query.sessions.findFirst({
			where: ({ id }, { eq }) => eq(id, sessionId),
			with: {
				user: true
			}
		});

		if (!session) return null;
		if (Date.now() >= session.expiresAt.getTime()) {
			return null;
		}

		await renewSession(session);

		return session;
	};

	event.locals.getUserData = async () => {
		const session = await event.locals.getSession();

		if (!session || !session.user) return null;

		const user = await db.query.users.findFirst({
			where: ({ id }, { eq }) => eq(id, session.user!.id),
			with: {
				sessions: true
			}
		});

		return user;
	};

	const response = await resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});

	return response;
};
