import { FastifyInstance, FastifySchema } from 'fastify';
import { getAllEvents, createEvent } from './events.service';
import { getEventsSchema, createEventSchema } from './events.schema';

export async function eventsRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/events',
    {
      schema: getEventsSchema as FastifySchema,
    },
    async (_, reply) => {
      const events = await getAllEvents();
      const eventCount = events.length;

      reply.send({ events, count: eventCount });
    },
  );

  fastify.post(
    '/events',
    {
      schema: createEventSchema as FastifySchema,
    },
    async (request, reply) => {
      const {
        created_by,
        event_name,
        description,
        start_time,
        end_time,
        status,
      } = request.body as {
        created_by: number;
        event_name: string;
        description: string;
        start_time: string | Date; // ISO string or Date object for timestamps
        end_time: string | Date;
        status: string;
      };

      if (
        !event_name ||
        !description ||
        !status ||
        !start_time ||
        !end_time ||
        !created_by
      ) {
        reply.status(500).send({
          message:
            'All fields (reated_by, event_name, description, start_time, end_time, status) are required',
        });
      }

      try {
        const newEvent = await createEvent({
          created_by,
          event_name,
          description,
          start_time,
          end_time,
          status,
        });

        reply.status(201).send(newEvent);
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(500)
            .send({ message: 'Error creating event', error: error.message });
        } else {
          reply.status(500).send({ message: 'An unknown error occurred' });
        }
      }
    },
  );
}
