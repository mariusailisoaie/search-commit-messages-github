import { createSelector } from 'reselect';

const rateLimitSelector = state => state.rateLimit;

export const getRateLimitSelector = createSelector([rateLimitSelector], rateLimit => rateLimit.rateLimit);
