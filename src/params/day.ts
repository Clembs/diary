import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	const month = Number(param);

	return !(isNaN(month) || month < 1 || month > 31);
};
