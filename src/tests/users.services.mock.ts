// src/tests/users.service.mock.ts

import { mockDb } from './mockDb';

// Mock the service functions
export const getUserById = async (id: string) => {
  return mockDb.find("users", id);
};

export const getAllUsers = async () => {
  return mockDb.select("users");
};

export const createUser = async (user: any) => {
  return mockDb.insert("users", user);
};

export const updateUserById = async (id: string, userData: any) => {
  return mockDb.update("users", id, userData);
};

export const deleteUserById = async (id: string) => {
  return mockDb.delete("users", id);
};
