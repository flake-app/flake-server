import {
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  getAllUsers,
} from "./users.services.mock";
import { mockDb } from "./mockDb";

// Jest setup: clearing any existing user data
beforeEach(() => {
  mockDb.users = [];
});

test("should create a new user", async () => {
  const user = {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "password123",
  };

  const createdUser = await createUser(user);

  expect(createdUser).toHaveProperty("id");
  expect(createdUser.first_name).toBe("Jane");
  expect(createdUser.last_name).toBe("Smith");
  expect(createdUser.email).toBe("jane.smith@example.com");
});

test("should get all users", async () => {
  await createUser({
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "password123",
  });

  const users = await getAllUsers();
  expect(users.length).toBe(1);
  expect(users[0].first_name).toBe("Jane");
});

test("should get a user by ID", async () => {
  await createUser({
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "password123",
  });

  const user = await getUserById("1");
  expect(user).not.toBeNull();
  expect(user?.first_name).toBe("Jane");
});

test("should delete a user by ID", async () => {
  const user = await createUser({
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "password123",
  });

  const deleteResult = await deleteUserById(user.id);
  expect(deleteResult).toBe(true);

  const userAfterDelete = await getUserById(user.id);
  expect(userAfterDelete).toBeNull();
});

test("should update a user by ID", async () => {
  const user = await createUser({
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "password123",
  });

  const updatedUser = await updateUserById(user.id, {
    first_name: "Janet",
    email: "janet.smith@example.com",
  });
  expect(updatedUser?.first_name).toBe("Janet");
  expect(updatedUser?.email).toBe("janet.smith@example.com");
});
