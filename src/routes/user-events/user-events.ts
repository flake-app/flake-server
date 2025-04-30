import { FastifyInstance, FastifySchema } from 'fastify';
import { getAllUserEvents, updateUserEventById } from './user-events.service';
import {
  getUserEventsSchema,
  updateUserEventSchema,
} from './user-events.schema';
import { STATUS_CODES } from '../../util/constants';

export async function userEventsRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/user-events',
    {
      schema: getUserEventsSchema as FastifySchema,
    },
    async (_, reply) => {
      const events = await getAllUserEvents();
      const eventCount = events.length;

      reply.send({ events, count: eventCount });
    }
  );

  fastify.patch(
    '/user-events/:id',
    {
      schema: updateUserEventSchema as FastifySchema,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      const { attending } = request.body as {
        attending: null | boolean;
      };

      try {
        const updatedUserEvent = await updateUserEventById(attending, id);

        if (!updatedUserEvent) {
          return reply
            .status(404)
            .send({ message: 'User_events update failed' });
        }

        reply.status(STATUS_CODES.OK).send({
          message: 'User_events updates successfully',
          user_event: updatedUserEvent,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
            message: 'error updating user_event',
            error: error.message,
          });
        } else {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'Something broke bro' });
        }
      }
    }
  );
}
