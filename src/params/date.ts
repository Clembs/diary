import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return /^\d{4}-\d{2}-\d{2}$/g.test(param);
};
