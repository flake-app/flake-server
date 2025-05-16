import {
  getEventById,
  createEvent,
  deleteEventById,
  updateEventById,
} from './events.service.mock';

import { mockDb } from './mockDb';

// Jest setup: clearing any existing event data
beforeEach(() => {
  mockDb.events = []; // Clear the mock DB before each test
});

test('should create a new event', async () => {
  const event = {
    created_by: 1,
    event_name: 'Test Event Name',
    description: 'Test event description',
    start_time: new Date(),
    end_time: new Date(),
    status: 'ONGOING' as const,
  };

  const createdEvent = await createEvent(event);

  // Ensure createdEvent is not null before accessing its properties
  expect(createdEvent).not.toBeNull();
  if (createdEvent) {
    expect(createdEvent.created_by).toBe(1);
    expect(createdEvent.event_name).toBe('Test Event Name');
    expect(createdEvent.description).toBe('Test event description');
    expect(createdEvent.start_time).toBeInstanceOf(Date);
    expect(createdEvent.end_time).toBeInstanceOf(Date);
    expect(createdEvent.status).toBe('ONGOING');
  }
});

test('should get a event by ID', async () => {
  const createdEvent = await createEvent({
    created_by: 1,
    event_name: 'Test Event Name',
    description: 'Test event description',
    start_time: new Date(),
    end_time: new Date(),
    status: 'ONGOING' as const,
  });

  // Ensure createdEvent is not null before accessing its properties
  expect(createdEvent).not.toBeNull();
  if (createdEvent) {
    const event = await getEventById(createdEvent.id);
    expect(event).not.toBeNull();
    if (event) {
      expect(event.event_name).toBe('Test Event Name');
    }
  }
});

test('should delete a event by ID', async () => {
  const createdEvent = await createEvent({
    created_by: 1,
    event_name: 'Test Event Name',
    description: 'Test event description',
    start_time: new Date(),
    end_time: new Date(),
    status: 'ONGOING' as const,
  });

  // Ensure createdEvent is not null before accessing its properties
  expect(createdEvent).not.toBeNull();
  if (createdEvent) {
    const deleteResult = await deleteEventById(createdEvent.id);
    expect(deleteResult).toBe(true);

    const eventAfterDelete = await getEventById(createdEvent.id);
    expect(eventAfterDelete).toBeNull();
  }
});

test('should update a event by ID', async () => {
  const createdEvent = await createEvent({
    created_by: 1,
    event_name: 'Test Event Name',
    description: 'Test event description',
    start_time: new Date(),
    end_time: new Date(),
    status: 'ONGOING' as const,
  });

  // Ensure createdEvent is not null before accessing its properties
  expect(createdEvent).not.toBeNull();
  if (createdEvent) {
    const updatedevent = await updateEventById(createdEvent.id, {
      event_name: 'New Event Name',
      description: 'New event description',
    });

    expect(updatedevent?.event_name).toBe('New Event Name');
    expect(updatedevent?.description).toBe('New event description');
  }
});
