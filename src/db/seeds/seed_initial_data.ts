import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('auth_users').del();
  await knex('users').del();
  await knex('events').del();
  await knex('user_events').del();

  // Reset the auto-incrementing IDs
  await knex.raw('TRUNCATE TABLE user_events RESTART IDENTITY CASCADE;');
  await knex.raw('TRUNCATE TABLE events RESTART IDENTITY CASCADE;');
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
  await knex.raw('TRUNCATE TABLE auth_users RESTART IDENTITY CASCADE;');

  // Inserts seed entries
  await knex('auth_users').insert([
    {
      first_name: 'Chak',
      last_name: 'Yeth',
      email: 'chak.yeth@gmail.com',
      is_admin: true,
    },
    {
      first_name: 'Jenny',
      last_name: 'Duong',
      email: 'itsjennyduong@gmail.com',
      is_admin: true,
    },
    {
      first_name: 'Vivian',
      last_name: 'Duong',
      email: 'mikovivian@gmail.com',
      is_admin: true,
    },
  ]);

  await knex('users').insert([
    {
      first_name: 'Chak',
      last_name: 'Yeth',
      email: 'chak.yeth@gmail.com',
      password: 'password',
    },
    {
      first_name: 'Jenny',
      last_name: 'Duong',
      email: 'itsjennyduong@gmail.com',
      password: 'password',
    },
    {
      first_name: 'Vivian',
      last_name: 'Duong',
      email: 'mikovivian@gmail.com',
      password: 'password',
    },
    {
      first_name: 'Fish',
      last_name: 'Duong',
      email: 'coolcat16@gmail.com',
      password: 'password',
    },
    {
      first_name: 'Test1',
      last_name: 'Last1',
      email: 'test1@gmail.com',
      password: 'password',
    },
    {
      first_name: 'Test2',
      last_name: 'Last2',
      email: 'test2@gmail.com',
      password: 'password',
    },
    {
      first_name: 'Test3',
      last_name: 'Last3',
      email: 'test3@gmail.com',
      password: 'password',
    },
  ]);

  await knex('events').insert([
    {
      created_by: 1,
      event_name: 'Mechanical Keyboard Enthusiasts Meetup',
      description:
        'Discuss the latest in mechanical keyboard technology and customization.',
      start_time: '2024-10-01 18:00:00+00',
      end_time: '2024-10-01 20:00:00+00',
      status: 'ONGOING',
    },
    {
      created_by: 2,
      event_name: 'Board Game Night: Eurogames Edition',
      description: 'Join us for a night of strategy board games from Europe.',
      start_time: '2024-10-02 19:00:00+00',
      end_time: '2024-10-02 22:00:00+00',
      status: 'CANCELLED',
    },
    {
      created_by: 3,
      event_name: 'Vintage Video Game Swap Meet',
      description: 'Bring your old games to trade with fellow collectors.',
      start_time: '2024-10-05 10:00:00+00',
      end_time: '2024-10-05 14:00:00+00',
      status: 'ONGOING',
    },
    {
      created_by: 1,
      event_name: 'Local Dungeons & Dragons Campaign',
      description:
        'Join a campaign with local players; all experience levels welcome.',
      start_time: '2024-10-10 17:00:00+00',
      end_time: '2024-10-10 21:00:00+00',
      status: 'ONGOING',
    },
    {
      created_by: 2,
      event_name: 'Handmade Leather Goods Workshop',
      description: 'Learn to make your own leather accessories.',
      start_time: '2024-10-12 10:00:00+00',
      end_time: '2024-10-12 13:00:00+00',
      status: 'FLAKED',
    }, // Flaked event
    {
      created_by: 3,
      event_name: 'Miniature Painting Night',
      description: 'Bring your miniatures and join us for a painting session.',
      start_time: '2024-10-15 18:00:00+00',
      end_time: '2024-10-15 21:00:00+00',
      status: 'ONGOING',
    },
    {
      created_by: 1,
      event_name: 'Keyboard Building Workshop',
      description:
        'Assemble your own custom keyboard with various switches and keycaps.',
      start_time: '2024-10-20 14:00:00+00',
      end_time: '2024-10-20 17:00:00+00',
      status: 'FLAKED',
    }, // Flaked event

    // Completed events (in the past)
    {
      created_by: 2,
      event_name: 'How to Wipe Ur Butt: Incel Cleanliness',
      description:
        'Learn the basics of cleanliness so you can finally get laid!',
      start_time: '2024-09-25 15:00:00+00',
      end_time: '2024-09-25 18:00:00+00',
      status: 'COMPLETED',
    },
    {
      created_by: 3,
      event_name: '3D Printing Basics Class',
      description:
        'Learn the fundamentals of 3D printing and get started on your first project.',
      start_time: '2024-09-20 13:00:00+00',
      end_time: '2024-09-20 16:00:00+00',
      status: 'COMPLETED',
    },
  ]);

  await knex('user_events').insert([
    { user_id: 1, event_id: 1, attending: true },
    { user_id: 2, event_id: 1 },
    { user_id: 3, event_id: 1 },
    { user_id: 2, event_id: 2, attending: false }, // User cancelled
    { user_id: 1, event_id: 2, attending: false }, // User cancelled
    { user_id: 3, event_id: 3, attending: true },
    { user_id: 1, event_id: 3, attending: true },
    { user_id: 1, event_id: 4, attending: true },
    { user_id: 2, event_id: 4 },
    { user_id: 3, event_id: 4 },
    { user_id: 1, event_id: 5, attending: true },
    { user_id: 2, event_id: 5, attending: true },
    { user_id: 3, event_id: 6, attending: true },
    { user_id: 1, event_id: 6, attending: true },
    { user_id: 2, event_id: 7, attending: false },
    { user_id: 1, event_id: 8, attending: true },
    { user_id: 2, event_id: 8, attending: true },
    { user_id: 3, event_id: 9, attending: true },
    { user_id: 1, event_id: 9, attending: false },
  ]);
}
