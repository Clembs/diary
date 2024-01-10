import { db } from '$lib/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const entries = await db.query.entries.findMany({
		// orderBy: ({ date }, { desc }) => desc(date),
		where: ({ userId, date }, { between, eq, and }) =>
			and(
				eq(userId, params.user),
				between(date, `${params.year}/${params.month}/01`, `${params.year}/${params.month}/31`)
			),
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

	if (!entries) {
		throw error(404, 'Entry not found');
	}

	return json(entries);
};
