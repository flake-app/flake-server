import {
  CreateUserModel,
  UpdateUserModel,
  CreateEventModel,
  UpdateEventModel,
  EventModel,
} from '../models';

export const mockDb = {
  users: [
    {
      id: 1, // Use number instead of string for consistency
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],

  events: [
    {
      id: 1,
      created_by: 1,
      event_name: 'Test Event 1',
      description: 'This is a test event description',
      start_time: new Date(),
      end_time: new Date(),
      status: 'ONGOING',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ] as EventModel[],

  // Simulating select all users operation
  async select(table: string) {
    if (table === 'users') return this.users;
    if (table === 'events') return this.events;
    return [];
  },

  // Simulating insert user operation
  async insertUser(table: string, user: CreateUserModel) {
    if (table === 'users') {
      const newUser = {
        id: this.users.length + 1, // Ensure new user has a numeric ID
        ...user,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.users.push(newUser);
      return newUser;
    }
    return null;
  },

  // Simulating find user by id
  async findUser(table: string, id: number) {
    // Expect number for id
    if (table === 'users') {
      return this.users.find((user) => user.id === id) || null;
    }
    return null;
  },

  // Simulating delete user operation
  async deleteUser(table: string, id: number) {
    // Expect number for id
    if (table === 'users') {
      const index = this.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        this.users.splice(index, 1);
        return true;
      }
    }
    return false;
  },

  // Simulating update user operation
  async updateUser(table: string, id: number, newData: UpdateUserModel) {
    // Expect number for id
    if (table === 'users') {
      const userIndex = this.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        this.users[userIndex] = {
          ...this.users[userIndex],
          ...newData,
          updated_at: new Date(),
        };
        return this.users[userIndex];
      }
    }
    return null;
  },

  // Simulating insert event operation
  async insertEvent(table: string, event: CreateEventModel) {
    if (table === 'events') {
      const newEvent = {
        id: this.events.length + 1, // Ensure new event has a numeric ID
        ...event,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.events.push(newEvent);
      return newEvent;
    }
    return null;
  },

  // Simulating find event by id
  async findEvent(table: string, id: number) {
    // Expect number for id
    if (table === 'events') {
      return this.events.find((event) => event.id === id) || null;
    }
    return null;
  },

  // Simulating delete event operation
  async deleteEvent(table: string, id: number) {
    // Expect number for id
    if (table === 'events') {
      const index = this.events.findIndex((event) => event.id === id);
      if (index !== -1) {
        this.events.splice(index, 1);
        return true;
      }
    }
    return false;
  },

  // Simulating update event operation
  async updateEvent(table: string, id: number, newData: UpdateEventModel) {
    // Expect number for id
    if (table === 'events') {
      const eventIndex = this.events.findIndex((event) => event.id === id);
      if (eventIndex !== -1) {
        this.events[eventIndex] = {
          ...this.events[eventIndex],
          ...newData,
          updated_at: new Date(),
        };
        return this.events[eventIndex];
      }
    }
    return null;
  },
};
