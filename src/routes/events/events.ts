import { FastifyInstance, FastifySchema } from 'fastify';
import {
  getAllEvents,
  createEvent,
  getEventById,
  deleteEventById,
  updateEventById,
} from './events.service';
import {
  getEventsSchema,
  getEventSchema,
  createEventSchema,
  deleteEventSchema,
  updateEventSchema,
} from './events.schema';
import { EventModel, UpdateEventModel } from '../../models';
import { STATUS_CODES } from '../../util/constants';

export async function eventsRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/events',
    {
      schema: getEventsSchema as FastifySchema,
    },
    async (_, reply) => {
      const events = (await getAllEvents()) as EventModel[];
      const eventCount = events.length;

      reply.send({ events, count: eventCount });
    }
  );

  fastify.get(
    '/events/:id',
    {
      schema: getEventSchema as FastifySchema,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };

      try {
        const event = (await getEventById(id)) as EventModel[] | undefined;

        if (!event) {
          reply
            .status(STATUS_CODES.NOT_FOUND)
            .send({ message: 'Event not found' });
          return;
        }

        reply.status(STATUS_CODES.OK).send(event);
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'Error fetching event', error: error.message });
        } else {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'An unknown error occurred' });
        }
      }
    }
  );

  fastify.delete(
    '/events/:id',
    {
      schema: deleteEventSchema as FastifySchema,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      let event_name;

      try {
        const event = await getEventById(id);

        if (!event) {
          reply
            .status(STATUS_CODES.NOT_FOUND)
            .send({ message: 'Event not found' });
          return;
        }

        event_name = event.event_name;

        await deleteEventById(id);
        reply.status(STATUS_CODES.OK).send({
          message: `Event id ${id} (${event_name}) deleted successfully`,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'Error deleting event', error: error.message });
        } else {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'An unknown error occurred' });
        }
      }
    }
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
        reply.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
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
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'Error creating event', error: error.message });
        } else {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'An unknown error occurred' });
        }
      }
    }
  );

  fastify.patch(
    '/events/:id',
    {
      schema: updateEventSchema as FastifySchema,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      const updates = request.body as UpdateEventModel;

      try {
        const existingEvent = await getEventById(id);

        if (!existingEvent) {
          return reply
            .status(STATUS_CODES.NOT_FOUND)
            .send({ message: 'Event not found' });
        }

        const updatedEvent = await updateEventById(
          {
            event_name: updates.event_name ?? existingEvent.event_name,
            description: updates.description ?? existingEvent.description,
            start_time: updates.start_time ?? existingEvent.start_time,
            end_time: updates.end_time ?? existingEvent.end_time,
            status: updates.status ?? existingEvent.status,
            created_by: updates.created_by ?? existingEvent.created_by,
          },
          id
        );

        if (!updatedEvent) {
          return reply
            .status(STATUS_CODES.NOT_FOUND)
            .send({ message: 'Event update failed' });
        }

        reply
          .status(STATUS_CODES.OK)
          .send({ message: 'Event updated successfully', event: updatedEvent });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'Error updating event', error: error.message });
        } else {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'An unknown error occurred' });
        }
      }
    }
  );
}
