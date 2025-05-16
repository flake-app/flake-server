import { CreateEventModel, UpdateEventModel } from '../models';
import { mockDb } from './mockDb';

// Mock the service functions with correct typings
export const getEventById = async (id: number) => {
  // Expect number for id
  return mockDb.findEvent('events', id);
};

export const getAllEvents = async () => {
  return mockDb.select('events');
};

export const createEvent = async (event: CreateEventModel) => {
  // Use CreateEventModel for typing
  return mockDb.insertEvent('events', event);
};

export const updateEventById = async (
  id: number,
  userData: UpdateEventModel
) => {
  // Expect number for id
  return mockDb.updateEvent('events', id, userData);
};

export const deleteEventById = async (id: number) => {
  // Expect number for id
  return mockDb.deleteEvent('events', id);
};
