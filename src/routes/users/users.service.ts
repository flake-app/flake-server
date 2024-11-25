import knex from "knex";
import knexConfig from "../../knexfile";

const db = knex(knexConfig.development);

export async function getAllUsers() {
  return db("users").select("*");
}

export async function getUserById(id: number) {
  const user = await db("users").where({ id }).first();

  if (user === 0) { 
    throw new Error("User not found");
  }
  return user;
}

export async function deleteUserById(id: number) {
  const rowsDeleted = await db("users").where({ id }).del();

  if (rowsDeleted === 0) {
    throw new Error("User not found");
  }
}

export async function createUser(user: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  const [newUser] = await db("users")
    .insert({
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning("*");

  return newUser;
}

export async function updateUserById(
  updatedEmail: string,
  updatedFirstName: string,
  updatedLastName: string,
  updatedPassword: string,
  userId: number
) {
  try {
    const updatedUser = await db("users")
      .where({ id: userId })
      .update(
        {
          first_name: updatedFirstName,
          last_name: updatedLastName,
          email: updatedEmail,
          password: updatedPassword,
          updated_at: db.fn.now(),
        },
        ["id", "first_name", "last_name", "email", "password"]
      )
      .returning("*");

    if (updatedUser.length === 0) {
      // if no user was updated (i.e., no user with that ID)
      return null;
    }

    return updatedUser[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}
