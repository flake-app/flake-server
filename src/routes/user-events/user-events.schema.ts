export const getUserEventsSchema = {
  description: "Get list of all user events",
  tags: ["User Events"],
  response: {
    200: {
      type: "object",
      properties: {
        events: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              user_id: { type: "number" },
              event_id: { type: "number" },
              attending: { type: "boolean" },
              created_at: { type: "string", format: "date-time" },
              updated_at: { type: "string", format: "date-time" },
            },
          },
        },
        count: { type: "number" },
      },
    },
  },
} as const;

export const updateUserEventSchema = {
  description: "Update existing user event by ID",
  tags: ["User Events"],
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      attending: { type: "boolean"},
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        user_event: {
          type: "object",
          properties: {
            id: { type: "number" },
            attending: { type: "boolean" },
          },
        },
      },
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        message: { type: "string" },
        error: { type: "string" },
      },
    },
  },
} as const;
