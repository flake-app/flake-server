# flake-server

## tech stack

- server/rest-api: [fastify](https://fastify.dev/)
- rest-api docs: [fastify-oas](https://github.com/SkeLLLa/fastify-oas)
- db: [postgres](https://www.postgresql.org/)
- db-migrations: [knexjs](https://knexjs.org/)
- tests: [jest](https://jestjs.io/)

## prerequisites

- [docker](https://docs.docker.com/get-docker/) is installed
- [brew](https://brew.sh/) is installed
- [nvm](https://github.com/nvm-sh/nvm) is installed
  > - can be installed via brew with:
  >   ```
  >   $ brew install nvm
  >   ```
  > - add to your `.zshrc` profile (or `.bashrc`) (_only_ if you're a brew girly):
  >   ```
  >   # NVM
  >   export NVM_DIR="$HOME/.nvm"
  >   [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  >   [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
  >   ```
  > - install the latest npm version
  >   ```
  >   $ nvm install --latest-npm
  >   ```
- clone the repo

## running the server

1.  run docker containers

    **TODO:** for now, only db is running on docker, will eventually add server

    ```
    $ docker compose up
    ```

1.  install packages
    ```
    $ npm i
    ```
1.  navigate into the `/src` folder
    ```
    $ cd src/
    ```
1.  run migrations to get latest db changes
    ```
    $ npx knex migrate:latest
    ```
1.  (_only if running for the first time or if in need of clean original data_) run seeding
    ```
    $ npx knex seed:run
    ```
    **note**: to view initial db creation, please read `db/init.sql`
1.  run the api server
    ```
    $ npm run start:dev
    ```

## api information

- api url: http://localhost:3000
- api healthcheck: http://localhost:3000/healthcheck
- api docs: http://localhost:3000/docs

## running tests

to run all tests:

```
$ npx jest
```

to run a specific test:

```
$ npx jest tests/users.test.js
```

## coding standards

### everything

1. please make a new branch + new pr when making big changes. i am too poor to pay for a higher tier for github in order to disable git pushes into `develop`.
1. before checking everything in, make sure all lint + prettier + test case issues are resolved
   ```
   $ npx eslint .
   $ npx prettier --check .
   $ npx jest .
   ```

### db + knex

1. when needing to modify anything db related (tables, columns, etc), please create a migration script
   ```
   $ npx knex migrate:make <name of migration file with description>
   ```
1. this will create a file in the `./migrations` folder, please add changes in there and apply the changes afterwards
   ```
   $ npx knex migrate:latest
   ```
1. check in and publish a pr!
