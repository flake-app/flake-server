import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('auth_users', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.boolean('is_admin').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('hashed_pw').notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('events', (table) => {
    table.increments('id').primary();
    table
      .integer('created_by')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.string('event_name').notNullable();
    table.text('description');
    table.timestamp('start_time').notNullable();
    table.timestamp('end_time');
    table.string('status').notNullable().defaultTo('ONGOING');
    table.timestamps(true, true);
    table.check("status IN ('CANCELLED', 'ONGOING', 'COMPLETED', 'FLAKED')");
  });

  await knex.schema.createTable('user_events', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('event_id')
      .references('id')
      .inTable('events')
      .onDelete('CASCADE');
    table.boolean('attending').defaultTo(null);
    table.timestamps(true, true);
    table.unique(['user_id', 'event_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('auth_users');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('events');
  await knex.schema.dropTableIfExists('user_events');
}
