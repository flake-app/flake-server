import knex from "knex";
import knexConfig from "../../knexfile";

const db = knex(knexConfig.development);

export async function getAllEvents() {
  return db("events").select("*");
}
