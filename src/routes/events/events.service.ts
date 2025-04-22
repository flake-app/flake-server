import knex from 'knex';
import knexConfig from '../../knexfile';
import { EventModel } from '../../models';

const db = knex(knexConfig.development);

export async function getAllEvents() {
  return db('events').select('*');
}

export async function getEventById(
  id: number
): Promise<EventModel | undefined> {
  const event = await db('events').where({ id }).first();

  if (event === 0) {
    throw new Error('Event not found');
  }
  return event;
}

export async function deleteEventById(id: number) {
  const rowsDeleted = await db('events').where({ id }).del();

  if (rowsDeleted === 0) {
    throw new Error('Event not found');
  }
}

export async function createEvent(event: {
  created_by: number;
  event_name: string;
  description: string;
  start_time: string | Date; // ISO string or Date object for timestamps
  end_time: string | Date;
  status: string;
}) {
  const [newEvent] = await db('events')
    .insert({
      ...event,
      created_at: new Date(), // Automatically add timestamps for record creation
      updated_at: new Date(),
    })
    .returning('*');

  return newEvent;
}
