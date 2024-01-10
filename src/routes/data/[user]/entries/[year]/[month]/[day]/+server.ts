import { db } from '$lib/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	// const requestDate = new Date(params.entry);
	const entry = await db.query.entries.findFirst({
		// orderBy: ({ date }, { desc }) => desc(date),
		where: ({ userId, date }, { eq, and }) =>
			and(eq(userId, params.user), eq(date, `${params.year}${params.month}${params.day}`)),
		columns: {
			date: true,
			summary: true,
			emoji: true,
			emotion: true
		},
		with: {
			activities: {
				with: {
					activity: {
						columns: {
							id: true,
							label: true,
							color: true
						}
					}
				},
				columns: {
					percent: true
				}
			}
		}
	});

	if (!entry) {
		throw error(404, 'Entry not found');
	}

	return json(entry);
};
