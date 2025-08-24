export const API_CONFIG = {
  BASE_URL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || 'http://localhost:3001/api/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
} as const;


export const QUERY_KEYS = {
  USERS: {
    ALL: ['users'] as const,
  },
  REPORTS: {
    ALL: ['reports'] as const,
  },
} as const;