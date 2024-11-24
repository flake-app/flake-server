import { FastifyInstance } from "fastify";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUserById,
} from "./users.service";
import {
  getUsersSchema,
  getUserSchema,
  deleteUserSchema,
  createUserSchema,
  updateUserSchema,
} from "./users.schema";
import { hashPassword } from "../../auth/auth.service";

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/users",
    {
      schema: getUsersSchema as any,
    },
    async (_, reply) => {
      const users = await getAllUsers();
      const userCount = users.length;

      reply.send({ users, count: userCount });
    }
  );

  fastify.get(
    "/users/:id",
    {
      schema: getUserSchema as any,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };

      try {
        const user = await getUserById(id);

        if (!user) {
          reply.status(404).send({ message: "User not found" });
          return;
        }

        reply.status(200).send(user);
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(500)
            .send({ message: "Error fetching user", error: error.message });
        } else {
          reply.status(500).send({ message: "An unknown error occurred" });
        }
      }
    }
  );

  fastify.delete(
    "/users/:id",
    {
      schema: deleteUserSchema as any,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };

      try {
        const user = await getUserById(id);

        if (!user) {
          reply.status(404).send({ message: "User not found" });
          return;
        }

        await deleteUserById(id);
        reply
          .status(200)
          .send({ message: `User with ID ${id} deleted successfully` });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(500)
            .send({ message: "Error deleting user", error: error.message });
        } else {
          reply.status(500).send({ message: "An unknown error occurred" });
        }
      }
    }
  );

  fastify.post(
    "/users",
    {
      schema: createUserSchema as any,
    },
    async (request, reply) => {
      const { first_name, last_name, email, password } = request.body as {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
      };

      if (!first_name || !last_name || !email || !password) {
        reply.status(500).send({
          message:
            "All fields (first_name, last_name, email, password) are required",
        });
      }

      try {
        const hashedPassword = await hashPassword(password);

        const newUser = await createUser({
          first_name,
          last_name,
          email,
          hashed_pw: hashedPassword,
        });

        reply.status(201).send(newUser);
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(500)
            .send({ message: "Error creating user", error: error.message });
        } else {
          reply.status(500).send({ message: "An unknown error occurred" });
        }
      }
    }
  );

  fastify.patch(
    "/users/:id",
    {
      schema: updateUserSchema as any,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      const { first_name, last_name, email, password } = request.body as {
        first_name?: string;
        last_name?: string;
        email?: string;
        password?: string;
      };

      if (!first_name && !last_name && !email && !password) {
        return reply.status(400).send({
          message:
            "At least one field (first_name, last_name, email, password) must be provided for update",
        });
      }

      try {
        const existingUser = await getUserById(id);

        if (!existingUser) {
          return reply.status(404).send({ message: "User not found" });
        }

        const updatedFirstName = first_name || existingUser.first_name;
        const updatedLastName = last_name || existingUser.last_name;
        const updatedEmail = email || existingUser.email;

        let updatedPassword = existingUser.password;
        if (password) {
          updatedPassword = await hashPassword(password);
        }

        const updatedUser = await updateUserById(
          updatedEmail,
          updatedFirstName,
          updatedLastName,
          updatedPassword,
          id
        );

        if (!updatedUser) {
          return reply.status(404).send({ message: "User update failed" });
        }

        reply
          .status(200)
          .send({ message: "User updated successfully", user: updatedUser });
      } catch (error: unknown) {
        if (error instanceof Error) {
          reply
            .status(500)
            .send({ message: "Error updating user", error: error.message });
        } else {
          reply.status(500).send({ message: "An unknown error occurred" });
        }
      }
    }
  );
}
