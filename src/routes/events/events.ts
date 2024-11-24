import { FastifyInstance } from "fastify";
import { getAllEvents } from "./events.service";
import { getEventsSchema } from "./events.schema";

export async function eventsRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/events",
    {
      schema: getEventsSchema as any,
    },
    async (_, reply) => {
      const events = await getAllEvents();
      const eventCount = events.length;

      reply.send({ events, count: eventCount });
    }
  );
}
