import knex from "knex";
import knexConfig from "../../knexfile";

const db = knex(knexConfig.development);

export async function getAllUserEvents() {
  return db("user_events").select("*");
}
