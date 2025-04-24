import { FastifyInstance, FastifySchema } from 'fastify';
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUserById,
} from './users.service';
import {
  getUsersSchema,
  getUserSchema,
  deleteUserSchema,
  createUserSchema,
  updateUserSchema,
} from './users.schema';
import { UserModel, CreateUserModel, UpdateUserModel } from '../../models';
import { hashPassword } from '../../util/utils';
import { STATUS_CODES } from '../../util/constants';

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/users',
    {
      schema: getUsersSchema as FastifySchema,
    },
    async (_, reply) => {
      const users = (await getAllUsers()) as UserModel[];
      const userCount = users.length;

      reply.send({ users, count: userCount });
    }
  );

  fastify.get(
    '/users/:id',
    {
      schema: getUserSchema as FastifySchema,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };

      try {
        const user = (await getUserById(id)) as UserModel | undefined;

        if (!user) {
          reply
            .status(STATUS_CODES.NOT_FOUND)
            .send({ message: 'User not found' });
          return;
        }

        reply.status(STATUS_CODES.OK).send(user);
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'Error fetching user', error: error.message });
        } else {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'An unknown error occurred' });
        }
      }
    }
  );

  fastify.delete(
    '/users/:id',
    {
      schema: deleteUserSchema as FastifySchema,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };

      try {
        const user = await getUserById(id);

        if (!user) {
          reply
            .status(STATUS_CODES.NOT_FOUND)
            .send({ message: 'User not found' });
          return;
        }

        await deleteUserById(id);
        reply
          .status(STATUS_CODES.OK)
          .send({ message: `User with ID ${id} deleted successfully` });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'Error deleting user', error: error.message });
        } else {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'An unknown error occurred' });
        }
      }
    }
  );

  fastify.post(
    '/users',
    {
      schema: createUserSchema as FastifySchema,
    },
    async (request, reply) => {
      const { first_name, last_name, email, password } = request.body as {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
      };

      if (!first_name || !last_name || !email || !password) {
        reply.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({
          message:
            'All fields (first_name, last_name, email, password) are required',
        });
      }

      try {
        const hashedPassword = await hashPassword(password);

        const newUser = await createUser({
          first_name,
          last_name,
          email,
          password: hashedPassword,
        } as CreateUserModel);

        reply.status(201).send(newUser);
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'Error creating user', error: error.message });
        } else {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'An unknown error occurred' });
        }
      }
    }
  );

  fastify.patch(
    '/users/:id',
    {
      schema: updateUserSchema as FastifySchema,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      const updates = request.body as UpdateUserModel;

      try {
        const existingUser = await getUserById(id);

        if (!existingUser) {
          return reply
            .status(STATUS_CODES.NOT_FOUND)
            .send({ message: 'User not found' });
        }

        const updatedUser = await updateUserById(
          {
            first_name: updates.first_name ?? existingUser.first_name,
            last_name: updates.last_name ?? existingUser.last_name,
            email: updates.email ?? existingUser.email,
            password: updates.password
              ? await hashPassword(updates.password)
              : existingUser.password,
          },
          id
        );

        if (!updatedUser) {
          return reply
            .status(STATUS_CODES.NOT_FOUND)
            .send({ message: 'User update failed' });
        }

        reply
          .status(STATUS_CODES.OK)
          .send({ message: 'User updated successfully', user: updatedUser });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'Error updating user', error: error.message });
        } else {
          reply
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: 'An unknown error occurred' });
        }
      }
    }
  );
}
