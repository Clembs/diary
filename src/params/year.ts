import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	const year = Number(param);

	return !(isNaN(year) || year < 2024 || year > 9999);
};
