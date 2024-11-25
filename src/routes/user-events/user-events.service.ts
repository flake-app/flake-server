import knex from "knex";
import knexConfig from "../../knexfile";

const db = knex(knexConfig.development);

export async function getAllUserEvents() {
  return db("user_events").select("*");
}

export async function updateUserEventById(
  updatedAttending: null | boolean,
  userEventId: number
) {
  try {
    const updatedUserEvent = await db("user_events")
      .where({ id: userEventId })
      .update(
        {
          attending: updatedAttending,
          updated_at: db.fn.now(),
        },
        ["id", "attending"]
      )
      .returning("*");

    if (updatedUserEvent.length === 0) {
      //if no user_event was updated 
      return null;
    }

    return updatedUserEvent[0];
  } catch (error) {
    console.error("Error updating user_events:", error);
    throw new Error("Failed to update user_events");
  }
}
