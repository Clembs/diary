import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const monthWithLeadingZero = month < 10 ? `0${month}` : month;

	throw redirect(302, `/journal/${year}/${monthWithLeadingZero}${url.search}`);
};
