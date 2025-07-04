export const getEventsSchema = {
  description: 'Get list of all events',
  tags: ['Events'],
  response: {
    200: {
      type: 'object',
      properties: {
        events: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              created_by: { type: 'number' },
              event_name: { type: 'string' },
              description: { type: 'string' },
              start_time: { type: 'string', format: 'date-time' },
              end_time: { type: 'string', format: 'date-time' },
              status: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
            },
          },
        },
        count: { type: 'number' },
      },
    },
  },
} as const;

export const getEventSchema = {
  description: 'Get event by ID',
  tags: ['Events'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        created_by: { type: 'number' },
        event_name: { type: 'string' },
        description: { type: 'string' },
        start_time: { type: 'string', format: 'date-time' },
        end_time: { type: 'string', format: 'date-time' },
        status: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
  },
} as const;

export const deleteEventSchema = {
  description: 'Delete event by ID',
  tags: ['Events'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  },
} as const;

export const createEventSchema = {
  description: 'Create new event',
  tags: ['Events'],
  body: {
    type: 'object',
    properties: {
      event_name: { type: 'string' },
      description: { type: 'string' },
      start_time: { type: 'string', format: 'date-time' },
      end_time: { type: 'string', format: 'date-time' },
      status: { type: 'string' },
      created_by: { type: 'number' },
    },
    required: [
      'event_name',
      'description',
      'start_time',
      'end_time',
      'status',
      'created_by',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        event_name: { type: 'string' },
        description: { type: 'string' },
        start_time: { type: 'string', format: 'date-time' },
        end_time: { type: 'string', format: 'date-time' },
        status: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  },
} as const;

export const updateEventSchema = {
  description: 'Update existing event by ID',
  tags: ['Events'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      event_name: { type: 'string' },
      description: { type: 'string' },
      start_time: { type: 'string', format: 'date-time' },
      end_time: { type: 'string', format: 'date-time' },
      status: { type: 'string' },
      created_by: { type: 'number' },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        event: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            event_name: { type: 'string' },
            description: { type: 'string' },
            start_time: { type: 'string', format: 'date-time' },
            end_time: { type: 'string', format: 'date-time' },
            status: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  },
} as const;
