import {
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
} from './users.services.mock';

import { mockDb } from './mockDb';

// Jest setup: clearing any existing user data
beforeEach(() => {
  mockDb.users = []; // Clear the mock DB before each test
});

test('should create a new user', async () => {
  const user = {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
  };

  const createdUser = await createUser(user);

  // Ensure createdUser is not null before accessing its properties
  expect(createdUser).not.toBeNull();
  if (createdUser) {
    expect(createdUser.first_name).toBe('Jane');
    expect(createdUser.last_name).toBe('Smith');
    expect(createdUser.email).toBe('jane.smith@example.com');
  }
});

test('should get a user by ID', async () => {
  const createdUser = await createUser({
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
  });

  // Ensure createdUser is not null before accessing its properties
  expect(createdUser).not.toBeNull();
  if (createdUser) {
    const user = await getUserById(createdUser.id);
    expect(user).not.toBeNull();
    if (user) {
      expect(user.first_name).toBe('Jane');
    }
  }
});

test('should delete a user by ID', async () => {
  const createdUser = await createUser({
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
  });

  // Ensure createdUser is not null before accessing its properties
  expect(createdUser).not.toBeNull();
  if (createdUser) {
    const deleteResult = await deleteUserById(createdUser.id);
    expect(deleteResult).toBe(true);

    const userAfterDelete = await getUserById(createdUser.id);
    expect(userAfterDelete).toBeNull();
  }
});

test('should update a user by ID', async () => {
  const createdUser = await createUser({
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
  });

  // Ensure createdUser is not null before accessing its properties
  expect(createdUser).not.toBeNull();
  if (createdUser) {
    const updatedUser = await updateUserById(createdUser.id, {
      first_name: 'Janet',
      email: 'janet.smith@example.com',
    });

    expect(updatedUser?.first_name).toBe('Janet');
    expect(updatedUser?.email).toBe('janet.smith@example.com');
  }
});
