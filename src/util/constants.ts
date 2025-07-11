export const PASSWORD_SALT_ROUNDS = 10;

export const EVENT_STATUSES = [
  'ONGOING',
  'CANCELLED',
  'COMPLETED',
  'FLAKED',
] as const;

export const DEFAULT_USER_ROLE = 'user';

export const STATUS_CODES = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CREATED: 201,
};
