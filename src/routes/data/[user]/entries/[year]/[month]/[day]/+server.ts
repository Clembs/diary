import { db } from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sql } from 'drizzle-orm';
import { addLeadingZero } from '$lib/helpers/addLeadingZero';

export const GET: RequestHandler = async ({ params }) => {
	const userDate = `${params.year}-${addLeadingZero(params.month)}-${addLeadingZero(params.day)}`;

	const entry = await db.query.entries.findFirst({
		where: ({ userId, date }, { eq, and }) =>
			and(eq(userId, params.user), eq(date, sql`TO_DATE(${userDate}, 'YYYY-MM-DD')`)),
		columns: {
			id: true,
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
