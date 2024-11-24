import { FastifyInstance } from "fastify";
import { getAllUserEvents } from "./user-events.service";
import { getUserEventsSchema } from "./user-events.schema";

export async function userEventsRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/user-events",
    {
      schema: getUserEventsSchema as any,
    },
    async (_, reply) => {
      const events = await getAllUserEvents();
      const eventCount = events.length;

      reply.send({ events, count: eventCount });
    }
  );
}
