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
