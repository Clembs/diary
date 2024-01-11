import { db } from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	const userDate = `${params.year}-${params.month}-${params.day}`;

	const entry = await db.query.entries.findFirst({
		where: ({ userId, date }, { eq, and }) =>
			and(eq(userId, params.user), eq(date, sql`${userDate}`)),
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

	return json(entry || null);
};
