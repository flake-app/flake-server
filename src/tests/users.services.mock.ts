import { CreateUserModel, UpdateUserModel } from '../models';
import { mockDb } from './mockDb';

// Mock the service functions with correct typings
export const getUserById = async (id: number) => {
  // Expect number for id
  return mockDb.find('users', id);
};

export const getAllUsers = async () => {
  return mockDb.select('users');
};

export const createUser = async (user: CreateUserModel) => {
  // Use CreateUserModel for typing
  return mockDb.insert('users', user);
};

export const updateUserById = async (id: number, userData: UpdateUserModel) => {
  // Expect number for id
  return mockDb.update('users', id, userData);
};

export const deleteUserById = async (id: number) => {
  // Expect number for id
  return mockDb.delete('users', id);
};
